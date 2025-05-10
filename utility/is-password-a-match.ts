import bcrypt from 'bcryptjs'


type PasswordComparerProps = {
    hashedPassword:string;
    password:string;
}



export async function isAPasswordMatch(payload: PasswordComparerProps): Promise<boolean> {

    // destructure props
    const { hashedPassword, password } = payload;

    const result = bcrypt.compare(password, hashedPassword);


    return result
}
