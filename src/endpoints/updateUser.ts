import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const updateUser =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { name, phone } = req.body

        if(!name || !phone){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const convert = String(phone).split('')
        if(convert.length !== 11){
            statusCode = 403
            throw new Error('Número de telefone inválido!')
        }


        const [user] = await con('labeninja_login').where({
            id: req.params.id
        })

        if(!user){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        await con('labeninja_login').update({
            name,
            phone
        }).where({
            id: req.params.id
        })


        res.status(200).send(`Cliente ${name} atualizado com sucesso`)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}