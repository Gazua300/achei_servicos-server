import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const getJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { name, email, payment } = req.body

    if(!name || !email || !payment){
      statusCode = 403
      throw new Error('Preencha os campos.')
    }


    const id = new Authentication().generateId()

    await con('labeninja_contratado').insert({
      id,
      name,
      email,
      payment,
      date: new Date()
    })

    res.status(200).send(id)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
