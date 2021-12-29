import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const createJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { title, description, price, dueDate, payment } = req.body
    const date = dueDate.split('/')
    const convertedDate = `${date[2]}-${date[1]}-${date[0]}`


    if(!title || !description || !price || !dueDate || !payment){
      statusCode = 401
      throw new Error('Preencha os campos')
    }

    if(isNaN(price)){
      statusCode = 403
      throw new Error('Em preço deve ser usado somente números!')
    }

    if(new Date(convertedDate) < new Date()){
      statusCode = 403
      throw new Error('A data de realização do serviço deve ser superior a data atual')
    }

    const id = new Authentication().generateId()
    const token = new Authentication().token(id)

    await con('labeninja').insert({
      id,
      title,
      description,
      price,
      dueDate: convertedDate,
      payment
    })

    res.status(200).send({ access_token: token })
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
