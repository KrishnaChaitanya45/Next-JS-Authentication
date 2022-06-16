import { hash , compare } from 'bcryptjs';
export async function HashedPassword(password){
    const saltedPassword = await hash(password , 15);
    return saltedPassword;
}
export async function VerifyPassword(password , saltedPassword){
    const isVerified = await compare(password,saltedPassword);
    return isVerified;
}