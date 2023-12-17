import { genSalt, hash } from "bcryptjs"

const SALT_RANDOMS = 8

const hashPassword = async (password:string)=>{
    const saltGenerated = await genSalt(SALT_RANDOMS)
    const hashPass = await hash(password,saltGenerated)
    return hashPass
}


export const PasswordCrypto = {
    hashPassword,

}

