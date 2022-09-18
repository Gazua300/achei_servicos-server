import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const deleteUser = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const [user] = await con('labeninja_login').where({
            id: req.params.id
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const [provider] = await con('labeninja').where({
            provider: req.params.id
        })

        if(provider){
            statusCode = 403
            throw new Error('Você não pode deletar sua conta, pois existem serviços à serem gerenciados!')
        }


        await con('labeninja_login').where({
            id: req.params.id
        }).del()

        
        res.status(200).send(`Conta do usuário ${user.name} excluída com sucesso!`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}