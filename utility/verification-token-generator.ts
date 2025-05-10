import { v4 as verificationToken } from 'uuid';



export function generateVerificationToken () {
    return verificationToken()
}