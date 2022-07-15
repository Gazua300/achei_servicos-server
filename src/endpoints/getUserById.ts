import { Request, Response } from 'express'
import { con } from '../connection/connection'


export const getUserById = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const [user] = await con('labeninja_login').where({
            id: req.params.id
        })

        if(!user){
            statusCode = 403
            throw new Error('Usuário não encontrado!')
        }
        
        res.status(200).send(user)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}