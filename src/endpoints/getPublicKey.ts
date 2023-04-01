import { Request, Response } from "express"
import { auth } from "../services/auth"
import { getHostAddress } from "../services/getHostAddress"
import { config } from "dotenv"



config()



export const getPublicKey =async (req:Request, res:Response)=>{
    var statusCode = 400
    try{
        
        const publicKey = process.env.PUBLIC_KEY

        const host = getHostAddress()
        
        

        res.status(200).send(host)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }    
}