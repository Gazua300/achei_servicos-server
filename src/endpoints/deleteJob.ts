import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'


export const deleteJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const token = req.headers.authorization
    const tokenData = new Authentication().tokenData(token as string)

    if(!token){
      statusCode = 401
      throw new Error('Token inválido, expirado ou ausente dos headers!')
    }

    const [user] = await con('labeninja_users').where({
      id: tokenData.payload
    })


    const [job] = await con('labeninja').where({
      user_id: user.id
    })

    
    if(user.id !== job.user_id){
      statusCode = 403
      throw new Error('Você só pode excluir serviços criados por você mesmo.')
    }

    await con('labeninja').delete().where({
      id: req.params.id
    })


    res.status(200).send(`${job.title} deletado com sucesso.`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
