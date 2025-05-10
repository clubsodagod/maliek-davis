import validateLogin from "./validate-login";


export default async function credentialUserLogin(password: string, credential: string) {

    try {
        // define credential object
        const credentials = {
            credential: credential, secret: password
        }

        console.log(credentials);


        const user = await validateLogin(credentials);

        // Check for response status and handle errors
        if (!user) {
            throw new Error(`HTTP error! Status: There was an error with the login attempt. Please try again.`);
        }

        // Parse the JSON response
        const data = await user;
        console.log("User data:", data);
        console.log(user);
        return data
    } catch (error: unknown) {
        console.log(error);
        return null
    }
}