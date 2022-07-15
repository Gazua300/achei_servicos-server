import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const login =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { phone, password } = req.body

        if(!phone || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('labeninja_login').where({
            phone
        })
        
        if(!user){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        const compare = new Authentication().compare(password, user.password)

        if(!compare){
            statusCode = 403
            throw new Error('Cliente não encontrado')
        }


        res.status(200).send(user.id)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}