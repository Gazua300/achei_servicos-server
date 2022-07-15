import { Request, Response } from 'express'
import { con } from '../connection/connection'




export const getJobByProvider = async(req:Request, res:Response):Promise<void>=>{
  try{

    const jobs = await con('labeninja').where({
        provider: req.params.id
    })
    

    res.status(200).send(jobs)
  }catch(error:any){
    res.status(400).send(error.message || error.sqlMessage)
  }
}
