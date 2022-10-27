import express from 'express'
import cors from 'cors'
import { getAllJobs } from './endpoints/getAllJobs'
import { getJobByProvider } from './endpoints/getJobByProvider'
import { createJob } from   './endpoints/createJob'
import { getJob } from './endpoints/getJob'
import { getUserById } from './endpoints/getUserById'
import { getJobById } from './endpoints/getJobById'
import { hiredByClient} from './endpoints/hiredByClient'
import { hiredByProvider } from './endpoints/hiredByProvider'
import { createUser } from './endpoints/createUser'
import { login } from './endpoints/login'
import { updateUser } from './endpoints/updateUser'
import { deleteUser } from './endpoints/deleteUser'
import { deleteJob } from './endpoints/deleteJob'
import { delHiredJob } from './endpoints/delHiredJob'

import { updateLogin_temp } from './endpoints/updateLogin_temp'
import { addEmail_temp } from './endpoints/addEmail_temp'



const app = express()
app.use(express.json())
app.use(cors())


app.get('/jobs', getAllJobs)
app.get('/provider/jobs/:id', getJobByProvider)
app.get('/job/:id', getJobById)
app.get('/hired/:id', hiredByClient)
app.get('/provider/:id', hiredByProvider)
app.get('/user/:id', getUserById)
app.post('/signup', createUser)
app.post('/login', login)
app.post('/jobs', createJob)
app.post('/job/:id', getJob)
app.put('/user/:id', updateUser)
app.delete('/user/:id', deleteUser)
app.delete('/job/:id', deleteJob)
app.delete('/hired/:id', delHiredJob)

app.post('/login_temp', updateLogin_temp)
app.put('/email/:id', addEmail_temp)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003')
})
