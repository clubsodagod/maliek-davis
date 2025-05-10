import { Credentials, UserType } from "@/library/types/users";
import { isAPasswordMatch } from "../is-password-a-match";
import UserModel from "../../database/models/user.model";
import connectToDB from "../../database/connect-to-db.database";







export default async function validateLogin(credentials: Credentials): Promise<UserType | null> {
    try {
        await connectToDB()

        // destructure credentials
        const { credential, secret } = credentials;

        console.log(credentials);

        // define user
        let user = null


        // check if credential is email or username
        if (credential.includes("@")) {
            user = await UserModel.findOne({ email: credential });
            if (!user) {
                throw new Error('No user associated with that email.')
            }

            const payload = {
                password: secret,
                hashedPassword: user.password
            }

            if (!isAPasswordMatch(payload)) {
                throw new Error("Invalid login attempt. Please try again.")
            }

            return user.depopulate("password") as UserType
        } else {
            user = await UserModel.findOne({ username: credential });
            if (!user) {
                throw new Error('There are no accounts associated with that email.')
            }

            const payload = {
                password: secret,
                hashedPassword: user.password
            }

            if (!isAPasswordMatch(payload)) {
                throw new Error("Invalid login attempt. Please try again.")
            }
            return user.depopulate('password')
        }

    } catch (error) {
        console.log(error);

        return null
    }
}
