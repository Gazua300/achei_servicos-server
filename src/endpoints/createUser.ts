import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const createUser =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { name, phone, password } = req.body
        const id = new Authentication().generateId()

        if(!name || !phone || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const convert = String(phone).split('')
        if(convert.length !== 11){
            statusCode = 403
            throw new Error('Número de telefone inválido!')
        }
        

        const hash = new Authentication().hash(password)
        const [user] = await con('labeninja_login').where({
            phone
        })

        if(user){
            statusCode = 404
            throw new Error('Cliente já cadastrado')
        }


        await con('labeninja_login').insert({
            id,
            name,
            phone,
            password: hash
        })


        res.status(200).send(id)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}