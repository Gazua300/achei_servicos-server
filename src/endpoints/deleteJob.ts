import { Request, Response } from 'express'
import { con } from '../connection/connection'



export const deleteJob = async(req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const [job] = await con('labeninja').where({
            id: req.params.id
        })

        if(!job){
            statusCode = 404
            throw new Error('Serviço não encontrado!')
        }


        const [provider] = await con('labeninja_contratado').where({
            provider: job.provider
        })

        if(provider){
            statusCode = 403
            throw new Error('Você não pode excluir este serviço pois ele já foi contratado. Entre em contato com o cliente para cancelá-lo se quiser excluí-lo!')
        }


        await con('labeninja').where({
            id: req.params.id
        }).del()

        
        res.status(200).send(`${job.tittle} excluído com sucesso!`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}