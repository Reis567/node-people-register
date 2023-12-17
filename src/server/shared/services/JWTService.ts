import * as jwt from 'jsonwebtoken'


interface IJWTData {
    uid:number
}


const sign = (data:IJWTData)=>{
    if(!process.env.JWT_SECRET){
        return 'JWT_SECRET_NOT_FOUND'
    }

    return jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'24h'})
}

const verify = ()=>{

}


export const JWTService = {
    sign,
    verify,
}