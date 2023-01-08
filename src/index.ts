import express from 'express'
import cors from 'cors'


import { getAllJobs } from './endpoints/getAllJobs'
import { createJob } from   './endpoints/createJob'
import { getJobById } from './endpoints/getJobById'
import { updatePushToken } from './endpoints/updatePushToken'
import { deleteJob } from './endpoints/deleteJob'



const app = express()
app.use(express.json())
app.use(cors())

app.get('/jobs', getAllJobs)
app.get('/job/:id', getJobById)
app.post('/jobs', createJob)
app.put('/pushtoken/:id', updatePushToken)
app.delete('/job/:id', deleteJob)




app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003')
})
