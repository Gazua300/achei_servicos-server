import { Request, Response } from "express"
import { con } from "../connection/connection"



export const getImagesDestination =async (req:Request, res:Response):Promise<void>=>{
    var statusCode = 400
    try{

        const images = await con('labeninja_images').where({
            provider: req.params.id
        })

        if(!images){
            statusCode = 404
            throw new Error('O usuário ainda não postou fotos sobre seu trabalho')
        }


        res.status(200).send(images)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    } 
}