import { Authentication } from "./Authentication"
import { con } from "../connection/connection"
import { Request } from "express"



export const auth = async(req:Request)=>{
    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)
    const [user] = await con('labeninja_users').where({
        id: tokenData
    })
    
    return user
}