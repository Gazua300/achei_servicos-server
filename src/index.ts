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
import { updatePushToken } from './endpoints/updatePushToken'
import { deleteUser } from './endpoints/deleteUser'
import { deleteJob } from './endpoints/deleteJob'
import { delHiredJob } from './endpoints/delHiredJob'
import { insertImnages } from './endpoints/insertImages'
import { getImagesDestination } from './endpoints/getImagesDestination'



const app = express()
app.use(express.json())
app.use(cors())

app.use('/photo', express.static('imgs'))

app.get('/jobs', getAllJobs)
app.get('/provider/jobs/:id', getJobByProvider)
app.get('/job/:id', getJobById)
app.get('/hired/:id', hiredByClient)
app.get('/provider/:id', hiredByProvider)
app.get('/user/:id', getUserById)
app.get('/images/:id', getImagesDestination)

app.post('/signup', createUser)
app.post('/login', login)
app.post('/jobs', createJob)
app.post('/job/:id', getJob)
app.post('/images/:id', insertImnages)

app.put('/user/:id', updateUser)
app.put('/pushtoken/:id', updatePushToken)

app.delete('/user/:id', deleteUser)
app.delete('/job/:id', deleteJob)
app.delete('/hired/:id', delHiredJob)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003')
})
