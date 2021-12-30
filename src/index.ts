import express from 'express'
import cors from 'cors'
import { getAllJobs } from './endpoints/getAllJobs'
import { createJob } from   './endpoints/createJob'
import { signin } from './endpoints/signin'
import { login } from './endpoints/login'
import { getJob } from './endpoints/getJob'



const app = express()
app.use(express.json())
app.use(cors())


app.get('/jobs', getAllJobs)
app.post('/jobs/signin', signin)
app.post('/jobs/login', login)
app.post('/jobs', createJob)
app.post('/jobs/contract', getJob)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003/')
})
