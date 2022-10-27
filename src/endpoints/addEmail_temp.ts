import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const addEmail_temp =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { email } = req.body

        if(!email){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('labeninja_login').where({
            id: req.params.id
        })

        if(!user){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        await con('labeninja_login').update({
            email
        }).where({
            id: req.params.id
        })


        res.status(200).send(`${email} adicionado com sucesso`)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}