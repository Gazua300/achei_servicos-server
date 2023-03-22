import { Request, Response } from 'express'
import { con } from '../connection/connection'
import fs from 'fs'
import path from 'path'



export const delImage = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{
        
        const [image] = await con('labeninja_images').where({
            id: req.params.id
        })

        if(!image){
            statusCode = 404
            throw new Error('Imagem não encontrada')
        }


        const imagePath = path.join(__dirname, '../uploads', image.imageName)
        if(!fs.existsSync(imagePath)){
            statusCode = 404
            throw new Error(`A imagem ${image.imageName} não foi encontrada`)
        }
        
        fs.unlink(imagePath, (err)=>{
            if(err){
                statusCode = 500
                throw new Error('Erro interno')
            }
        })


        await con('labeninja_images').del().where({
            id: image.id
        })


        res.status(200).send(`Imagem exluida com sucesso`)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}