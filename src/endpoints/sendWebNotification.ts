import { Request, Response } from "express"
import { auth } from "../services/auth"
import webPush from 'web-push'



export const sendWebNotification = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const user = await auth(req)
        const subscription = JSON.parse(user.subscription)

        webPush.sendNotification(subscription, 'Onda dodja')
        

        res.status(200).send('Notificação enviada')
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}