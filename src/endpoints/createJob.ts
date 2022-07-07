import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const createJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { title, description, price, initialDate, payment } = req.body
    const array = initialDate.split('/')
    const dueDate = `${array[2]}-${array[1]}-${array[0]}`
      

    if(!title || !description || !price || !initialDate || !payment){
      statusCode = 401
      throw new Error('Preencha os campos')
    }

    if(isNaN(price)){
      statusCode = 403
      throw new Error('Em preço deve ser usado somente números!')
    }

    if(new Date(initialDate) < new Date()){
      statusCode = 403
      throw new Error('A data de realização do serviço deve ser superior a data atual')
    }


    const id = new Authentication().generateId()

    await con('labeninja').insert({
      id,
      title,
      description,
      price,
      dueDate,
      payment
    })

    res.status(200).send(`${title} registrado com sucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
