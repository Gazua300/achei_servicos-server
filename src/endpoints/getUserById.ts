import { Request, Response } from "express"
import { auth } from "../services/auth"



export const getUserById =async (req:Request, res:Response) =>{
    var statusCode = 400
    try{

        const userAuth = await auth(req)
        

        res.status(200).send(userAuth)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }    
}