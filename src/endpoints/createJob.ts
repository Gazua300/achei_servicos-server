import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const createJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)


    const { title, description, price, dueDate, payment } = req.body


    if(!token){
      statusCode = 401
      throw new Error('Token invávlido, expirado ou ausente dos headers!')
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

    const id = new Authentication().generateId()

    await con('labeninja').insert({
      id,
      title,
      description,
      price,
      dueDate,
      payment,
      user_id: user.id
    })

    res.status(200).send(`${title} registrado com sucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
