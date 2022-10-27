import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const login =async(req:Request, res:Response):Promise<void> => {
    var statusCode = 400
    try{

        const { email } = req.body

        if(!email){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('labeninja_login').where({
            email
        })
        
        if(!user){
            statusCode = 404
            throw new Error('Cliente não encontrado')
        }


        res.status(200).send(user.id)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}