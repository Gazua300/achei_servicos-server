import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const insertImnages = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{
    
    const destination = req.file?.destination
    const name = req.file?.filename
    
    const [job] = await con('labeninja').where({
        id: req.params.id
    })

    if(!job){
        statusCode = 404
        throw new Error('Serviço não encontrado')
    }

    
    const id = new Authentication().generateId()

    await con('labeninja_images').insert({
      id,
      name,
      destination,
      provider: job.id
    })
    

    res.status(200).send(`Imagem registrada com sucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
