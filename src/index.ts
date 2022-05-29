import express from 'express'
import cors from 'cors'
import { getAllJobs } from './endpoints/getAllJobs'
import { createJob } from   './endpoints/createJob'
import { getJob } from './endpoints/getJob'
import { getJobByEmail } from './endpoints/getJobByEmail'



const app = express()
app.use(express.json())
app.use(cors())


app.get('/jobs', getAllJobs)
app.post('/jobs', createJob)
app.post('/job/', getJob)
app.post('/hired', getJobByEmail)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003/')
})
