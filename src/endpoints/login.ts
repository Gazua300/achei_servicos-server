import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const login = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const { email, password } = req.body

    if(!email || !password){
      statusCode = 401
      throw new Error('Preencha os campos.')
    }

    const [user] = await con('labeninja_users').where({
      email
    })

    if(!user){
      statusCode = 404
      throw new Error('Usuário não encontrado!')
    }


    const compare = new Authentication().compare(password, user.password)
    const token = new Authentication().token(user.id)


    if(compare !== true){
      statusCode = 403
      throw new Error('Usuário não encontrado!')
    }

    res.status(200).send({ access_token: token })
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }
}
