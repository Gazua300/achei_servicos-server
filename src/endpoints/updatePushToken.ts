import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { auth } from '../services/auth'



export const updatePushToken =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const userAuth = await auth(req)

        const { push_token } = req.body

        if(!push_token){
            statusCode = 404
            throw new Error('Push de notificação ausente')
        }


        await con('labeninja_users').update({
            push_token
        }).where({
            id: userAuth.id
        })


        res.status(200).send(`Token de notificação atualizado com sucesso`)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}