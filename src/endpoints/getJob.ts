import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const getJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { name, phone, client } = req.body
    const [job] = await con('labeninja').where({
      id: req.params.id
    })


    if(!job){
      statusCode = 404
      throw new Error('Serviço não encontrado')
    }

    
    if(!name || !phone || !client){
      statusCode = 403
      throw new Error('Preencha os campos.')
    }

    if(isNaN(phone)){
      statusCode = 403
      throw new Error('O telefone deve ser somente números!')
    }

    const convert = String(phone).split('')

    if(convert.length !== 11){
      statusCode = 403
      throw new Error('O telefone deve ser somento números')
    }


    if(client === job.provider){
      statusCode = 401
      throw new Error('Você está contratando um serviço que você mesmo cadastrou!')
    }


    const id = new Authentication().generateId()

    await con('labeninja_contratado').insert({
      id,
      name,
      phone,
      job: job.title,
      date: new Date().toLocaleDateString(),
      client,
      provider: job.id 
    })

    res.status(200).send(`${job.title} contratado com sucesso`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
