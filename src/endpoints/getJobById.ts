import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { auth } from '../services/auth'


export const getJobById = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        await auth(req)

        const [job] = await con('labeninja_pub').where({
            id: req.params.id
        })

        if(!job){
            statusCode = 403
            throw new Error('Serviço não encontrado!')
        }


        res.status(200).send(job)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}