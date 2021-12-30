import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const updateJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { title, description, price, dueDate, payment } = req.body
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

    if(new Date(dueDate) < new Date()){
      statusCode = 403
      throw new Error('A data de realização do serviço deve ser superior a data atual')
    }


    const [user] = await con('labeninja_users').where({
      id: tokenData.payload
    })


    const [job] = await con('labeninja').where({
      user_id: user.id
    })


    if(user.id !== job.user_id){
      statusCode = 403
      throw new Error('Você só pode alterar os serviços criados por você mesmo.')
    }


    await con('labeninja').update({
      title,
      description,
      price,
      dueDate,
      payment
    }).where({
      id: req.params.id
    })


    res.status(200).send(`${title} foi atualizado.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
