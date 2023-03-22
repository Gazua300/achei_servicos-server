import { Request, Response } from "express"
import { con } from '../connection/connection'
import { v4 } from 'uuid'


export const uploadJobImage = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const imageName = req.file?.filename
        const [job] = await con('labeninja_pub').where({
            id: req.params.id
        })

        if(!job){
            statusCode = 404
            throw new Error('Serviço não encontrado')
        }


        await con('labeninja_images').insert({
            id: v4(),
            imageName,
            job_id: job.id
        })


        res.status(200).send(`${imageName} enviada com sucesso`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}