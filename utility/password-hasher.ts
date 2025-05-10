import bcrypt from 'bcrypt'


type PasswordHasherProps = {
    saltRounds:number;
    password:string;
}

export async function passwordHasher (payload:PasswordHasherProps):Promise<string> {

    // destructure props
    const {saltRounds, password} = payload;

    const hashedPassword = bcrypt.hash(password,saltRounds);


    return hashedPassword
}