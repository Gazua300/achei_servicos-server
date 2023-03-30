import { Request, Response } from "express"
import { con } from "../connection/connection"
import { v4 } from "uuid"
import { Authentication } from "../services/Authentication"



export const createUser = async(req:Request, res:Response)=>{
    var statusCode = 400
    try{

        const { name, email, password, verifyPass } = req.body

        if(!name || !email || !password || !verifyPass){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        if(password.length < 6){
            statusCode = 403
            throw new Error('A senha deve ter um mínimo de 6 caracteres')
        }

        if(password !== verifyPass){
            statusCode = 403
            throw new Error('As senhas não correspondem')
        }

        
        const [user] = await con('labeninja_users').where({
            email
        })

        if(user){
            statusCode = 403
            throw new Error('Usuário já cadastrado')
        }


        const id = v4()
        const token = new Authentication().token(id)

        await con('labeninja_users').insert({
            id,
            name,
            email,
            password: new Authentication().hash(password)
        })

        
        res.status(201).send(token)
    }catch(e:any){
        res.status(statusCode).send(e.message || e.sqlMessage)
    } 
}