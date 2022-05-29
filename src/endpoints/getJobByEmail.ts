import { Request, Response } from 'express'
import { con } from '../connection/connection'


export const getJobByEmail = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const { email } = req.body

        if(!email){
            statusCode = 401
            throw new Error('Preencha os campos!')
        }

        const [job] = await con('labeninja_contratado').where({
            email
        })

        if(!job){
            statusCode = 403
            throw new Error('Registro não encontrado!')
        }

        const jobs = await con('labeninja_contratado').where({
            email
        })

        
        res.status(200).send(jobs)
    }catch(error:any){
        res.status(statusCode).send(error.message || error.sqlMessage)
    }
}