import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const createJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { title, description, phone, period, provider } = req.body

    if(!title || !description || !phone || !period){
      statusCode = 401
      throw new Error('Preencha os campos')
    }

    const convert = String(phone).split('')

    if(convert.length !== 11){
      statusCode = 403
      throw new Error('Número de telefone inválido')
    }

    if(isNaN(phone)){
      statusCode = 403
      throw new Error('O telefone deve ser somente números!')
    }

    
    const id = new Authentication().generateId()

    await con('labeninja').insert({
      id,
      title,
      description,
      phone,
      period,
      provider
    })
    

    res.status(200).send(`${title} registrado com sucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
