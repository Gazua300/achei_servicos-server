import express from 'express'
import cors from 'cors'
import { getAllJobs } from './endpoints/getAllJobs'
import { createJob } from   './endpoints/createJob'
import { updateJob } from './endpoints/updateJob'
import { deleteJob } from './endpoints/deleteJob'


const app = express()
app.use(express.json())
app.use(cors())


app.get('/jobs', getAllJobs)
app.post('/jobs', createJob)
app.post('/jobs/:id', updateJob)
app.delete('/jobs/:id', deleteJob)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003/')
})
