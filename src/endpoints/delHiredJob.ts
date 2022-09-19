import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const delHiredJob = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const [job] = await con('labeninja_contratado').where({
            id: req.params.id
        })

        
        if(!job){
            statusCode = 404
            throw new Error('Serviço não encontrado!')
        }

        
        await con('labeninja_contratado').where({
            id: req.params.id
        }).del()

        
        res.status(200).send(`${job.job} excluído com sucesso!`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}