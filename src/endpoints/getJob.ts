import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const getJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { title, price, tokenKey } = req.body

    if(!title || !price || !tokenKey){
      statusCode = 403
      throw new Error('Preencha os campos.')
    }

    const tokenData = new Authentication().tokenData(tokenKey)


    const [user] = await con('labeninja_users').where({
      id: tokenData.payload
    })


    const id = new Authentication().generateId()

    await con('labeninja_contratado').insert({
      id,
      title,
      price,
      user_id: user.id
    })

    res.status(200).send(`Serviço ${title} contratado com seucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
