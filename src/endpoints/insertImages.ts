import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const insertImnages = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{
    
    const destination = req.file?.destination
    const name = req.file?.filename
    
    const [user] = await con('labeninja_login').where({
        id: req.params.id
    })

    if(!user){
        statusCode = 404
        throw new Error('Usuário não encontrado')
    }

    
    const id = new Authentication().generateId()

    await con('labeninja_images').insert({
      id,
      name,
      destination,
      provider: user.id
    })
    

    res.status(200).send(`Imagem registrada com sucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
