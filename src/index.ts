import express, { Request } from 'express'
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
import { insertImnages } from './endpoints/insertImages'
import { getImagesDestination } from './endpoints/getImagesDestination'



const app = express()
app.use(express.json())
app.use(cors())

import multer from 'multer'
import path from 'node:path'


const upload = multer({
  storage: multer.diskStorage({
    destination(req:Request, file:any, cb:any){
      cb(null, path.resolve(__dirname, '..', 'imgs'))
    },
    filename(req:Request, file:any, cb:any){
      cb(null, `${Date.now().toString(18)}-${file.originalname}`)
    }
  })
})


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
app.post('/images/:id', upload.single('destination'), insertImnages)
app.put('/user/:id', updateUser)
app.delete('/user/:id', deleteUser)
app.delete('/job/:id', deleteJob)
app.delete('/hired/:id', delHiredJob)





app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server runing at http://localhost:3003')
})
