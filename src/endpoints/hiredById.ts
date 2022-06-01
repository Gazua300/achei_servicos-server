import { Request, Response } from 'express'
import { con } from '../connection/connection'


export const hiredById = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const [job] = await con('labeninja_contratado').where({
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