import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const updateJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { title, description, price, dueDate, payment } = req.body
    const date = dueDate.split('/')
    const convertedDate = `${date[2]}-${date[1]}-${date[0]}`
    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)


    if(!token){
      statusCode = 401
      throw new Error('Token inválido, expirado ou ausente dos headers!')
    }


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


    const [job] = await con('labeninja').where({
      id: req.params.id
    })


    if(tokenData.payload !== job.id){
      statusCode = 403
      throw new Error('Você só pode alterar os serviços criados por você mesmo.')
    }


    await con('labeninja').update({
      title,
      description,
      price,
      dueDate: convertedDate,
      payment
    }).where({
      id: req.params.id
    })


    res.status(200).send(`${title} foi atualizado.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
