import { Request, Response } from 'express'
import { con } from '../connection/connection'
import path from 'path'
import fs from 'fs'



export const displayJobImage = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const images = await con('labeninja_images').where({
            job_id: req.params.id
        })

        const imageSrcs = images.map(image=>{
            const imagePath = path.join(__dirname, '../uploads', image.imageName)
            
            if(!fs.existsSync(imagePath)){
                statusCode = 404
                throw new Error(`A imagem ${image.imageName} não foi encontrada`)
            }

            
            const data = fs.readFileSync(imagePath)

            const base64Image = Buffer.from(data).toString('base64')
            const imageSrc = `data:image/jpeg;base64,${base64Image}`

            return imageSrc
        })


        res.status(200).send(imageSrcs)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}