import { Request, Response } from "express"
import { con } from "../connection/connection"
import { auth } from "../services/auth"



export const registWebNotification =async (req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const user = await auth(req)
        const subscription = req.body

        
        await con('labeninja_users').update({
            subscription: JSON.stringify(subscription)
        }).where({
            id: user.id
        })
        

        res.status(201).send('Usuário registrado para notificações')
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }    
}