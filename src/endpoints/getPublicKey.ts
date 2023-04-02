import { Request, Response } from "express"
import { auth } from "../services/auth"
import { config } from "dotenv"
import webPush from 'web-push'


config()



export const getPublicKey = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        await auth(req)
        
        const publicKey = process.env.PUBLIC_KEY
        const privateKey = process.env.PRIVATE_KEY
        const host = `${req.protocol}://${req.headers.host}`
// console.log(publicKey, privateKey)
        webPush.setVapidDetails(host, String(publicKey), String(privateKey))


        res.status(200).send(publicKey)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}