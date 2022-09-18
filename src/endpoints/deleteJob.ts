import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const deleteJob = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const { user } = req.body

        const [job] = await con('labeninja').where({
            id: req.params.id
        })

        if(!job){
            statusCode = 404
            throw new Error('Serviço não encontrado!')
        }


        if(job.provider !== user){
            statusCode = 403
            throw new Error('Você só pode excluir um serviço que tenha sido criado por você!')
        }


        await con('labeninja').where({
            id: req.params.id
        }).del()

        
        res.status(200).send(`${job.tittle} excluído com sucesso!`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}