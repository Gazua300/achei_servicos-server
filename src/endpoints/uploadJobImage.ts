import { Request, Response } from "express"
import { con } from '../connection/connection'
import { v4 } from 'uuid'
import { auth } from "../services/auth"


export const uploadJobImage = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const user = await auth(req)

        const imageName = req.file?.filename
        const [job] = await con('labeninja_pub').where({
            id: req.params.id
        })

        if(!job){
            statusCode = 404
            throw new Error('Serviço não encontrado')
        }

        if(job.provider !== user.id){
            statusCode = 401
            throw new Error('Só é possível inserir imagens nos serviços que você cadastrou!')
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