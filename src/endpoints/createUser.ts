import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const createUser =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { name, email, password } = req.body
        const id = new Authentication().generateId()

        if(!name || !email || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const hash = new Authentication().hash(password)
        const [user] = await con('labeninja_login').where({
            email
        })

        if(user){
            statusCode = 404
            throw new Error('Cliente já cadastrado')
        }


        await con('labeninja_login').insert({
            id,
            name,
            email,
            password: hash
        })


        res.status(200).send(id)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}