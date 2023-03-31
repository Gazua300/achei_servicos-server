import { Request, Response } from "express"
import { con } from "../connection/connection"
import { auth } from "../services/auth"




export const getJobsByUser = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const user = await auth(req)

        const jobs = await con('labeninja_pub').where({
            provider: user.id
        })

        
        res.status(200).send(jobs)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}