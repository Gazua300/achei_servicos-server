import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { Authentication } from '../services/Authentication'



export const signin = async(req:Request, res:Response):Promise<void>=>{
  let statucCode = 400
  try{

    const { name, email, password } = req.body

    if(!name || !email || !password){
      statucCode = 401
      throw new Error('Preencha os campos.')
    }


    const [user] = await con('labeninja_users').where({
      email
    })

    if(user){
      statucCode = 403
      throw new Error('Email já cadastrado!')
    }


    const id = new Authentication().generateId()
    const hash = new Authentication().hash(password)
    const token = new Authentication().token(id)


    await con('labeninja_users').insert({
      id,
      name,
      email,
      password: hash
    })


    res.status(200).send(`Usuário ${name} registrado com sucesso.`)
  }catch(error:any){
    res.status(statucCode).send(error.message || error.sqlMessage)
  }
}
