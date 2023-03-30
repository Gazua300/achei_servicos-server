import { Request, Response } from 'express'
import { con } from '../connection/connection'
import { auth } from '../services/auth'
import { Authentication } from '../services/Authentication'


export const createJob = async(req:Request, res:Response):Promise<void>=>{
  let statusCode = 400
  try{

    const user = await auth(req)

    const { title, description, phone, period } = req.body

    if(!title || !description || !phone || !period){
      statusCode = 401
      throw new Error('Preencha os campos')
    }

    const convert = String(phone).split('')

    if(convert.length !== 11){
      statusCode = 403
      throw new Error('Número de telefone inválido')
    }

    if(isNaN(phone)){
      statusCode = 403
      throw new Error('O telefone deve ser somente números!')
    }


    const jobs = await con('labeninja_pub').where({
      provider: user.id
    })

    if(jobs.length > 0){
      jobs.map(job=>{
        if(
          title === job.title &&
          description === job.description &&
          phone === job.phone &&
          period === job.period
        ){
          statusCode = 403
          throw new Error('Você está tentando cadastrar o mesmo serviço novamente!')
        }
      })
    }

    
    const id = new Authentication().generateId()

    await con('labeninja_pub').insert({
      id,
      title,
      description,
      phone,
      period,
      provider: user.id
    })
    

    res.status(200).send(`${title} cadastrado com sucesso`)
  }catch(error:any){
    res.status(statusCode).send(error.message || error.sqlMessage)
  }

}
