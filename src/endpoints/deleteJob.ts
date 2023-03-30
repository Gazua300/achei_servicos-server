import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { auth } from '../services/auth'



export const deleteJob = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const user = await auth(req)

        const [job] = await con('labeninja_pub').where({
            id: req.params.id
        })

        if(!job){
            statusCode = 404
            throw new Error('Serviço não encontrado!')
        }
        
        if(job.provider !== user.id){
            statusCode = 401
            throw new Error('Você só pode excluir os serviços que você registrou!')
        }


        await con('labeninja_pub').where({
            id: req.params.id
        }).del()

        
        res.status(200).send(`${job.title} excluído com sucesso!`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}