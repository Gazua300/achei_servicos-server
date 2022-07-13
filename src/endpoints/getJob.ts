import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const getJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { name, phone } = req.body
    const [job] = await con('labeninja').where({
      id: req.params.id
    })

    if(!job){
      statusCode = 404
      throw new Error('Serviço não encontrado')
    }

    if(!name || !phone){
      statusCode = 403
      throw new Error('Preencha os campos.')
    }

    if(isNaN(phone)){
      statusCode = 403
      throw new Error('O telefone deve ser somente números!')
    }


    const id = new Authentication().generateId()

    await con('labeninja_contratado').insert({
      id,
      name,
      phone,
      job: job.title
    })

    res.status(200).send(`${job.title} contratado com sucesso`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
