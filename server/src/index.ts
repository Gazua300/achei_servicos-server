import express, {Express, Request, Response} from 'express'
import cors from 'cors'
import { con } from './connection/connection'


const app: Express = express()

app.use(express.json())
app.use(cors())

//==================================Get Jobs=======================
app.get('/jobs', async(req:Request, res:Response)=>{
    try{
        const result = await con('labeninja')
        res.send(result)
    }catch(e:any){
        res.status(400).send({message: e.message || e.sqlMessage})
    }
})
//================================Create job========================
app.post('/jobs', async(req:Request, res:Response)=>{
    try{

        const {title, description, price, paymentMethods, dueDate} = req.body
        const id = Math.floor(Math.random()*1000) + Date.now()

        await con('labeninja').insert({
            id,
            title,
            description,
            price,
            dueDate
        })
        
        for(let c = 0; c < paymentMethods.length; c++){
            await con('paymentMethods').insert({
                payment: paymentMethods[c],
                job_id: id
            })
        }
        
        res.end()

    }catch(e:any){
        res.status(400).send({message: e.message || e.sqlMessage})
    }
})

//====================================Server listening===================
app.listen(8000, ()=>{
    console.log('Server running at http://localhost:8000')
})
