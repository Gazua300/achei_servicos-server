import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const updatePushToken =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { push_token } = req.body

        if(!push_token){
            statusCode = 404
            throw new Error('Push de notificação ausente')
        }

        
        const [user] = await con('labeninja_pub').where({
            id: req.params.id
        })

        if(!user){
            statusCode = 404
            throw new Error('Serviço não encontrado')
        }


        await con('labeninja_pub').update({
            push_token
        }).where({
            id: req.params.id
        })


        res.status(200).send(`Token de notificação atualizado com sucesso`)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}