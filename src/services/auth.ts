import { Authentication } from "./Authentication"
import { con } from "../connection/connection"
import { Request } from "express"



export const auth = async(req:Request)=>{
    var statusCode = 400

    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)
    const [user] = await con('labeninja_users').where({
        id: tokenData
    })

    if(!user){
        statusCode = 403
        throw new Error('Usuário não encontrado')
    }
    
    return user
}