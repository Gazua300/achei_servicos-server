import { Request, Response } from "express"
import { con } from '../connection/connection'
import { v4 } from 'uuid'


export const uploadJobImage = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const imageName = req.file?.filename


        await con('labeninja_images').insert({
            id: v4(),
            imageName,
            user_id: 123
        })

        res.status(200).send('Sucesso!')
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}