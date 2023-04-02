import express from 'express'
import cors from 'cors'
import multer from 'multer'

// import webPush from 'web-push'

// console.log(webPush.generateVAPIDKeys())


const app = express()
app.use(express.json())
app.use(cors())


const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
      cb(null, './src/uploads')
  },
  filename: (req, file, cb)=>{
      cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


import { createUser } from './endpoints/createUser'
import { login } from './endpoints/login'
import { createJob } from   './endpoints/createJob'
import { uploadJobImage } from './endpoints/uploadJobImage'
import { registWebNotification } from './endpoints/registWebNotification'
import { sendWebNotification } from './endpoints/sendWebNotification'

import { getAllJobs } from './endpoints/getAllJobs'
import { getJobsByUser } from './endpoints/getJobsByUser'
import { getJobById } from './endpoints/getJobById'
import { getUserById } from './endpoints/getUserById'
import { displayJobImage } from './endpoints/displayJobImage'
import { getPublicKey } from './endpoints/getPublicKey'


import { deleteJob } from './endpoints/deleteJob'
import { delImage } from './endpoints/delImage'

import { updatePushToken } from './endpoints/updatePushToken'


app.post('/signup', createUser)
app.post('/login', login)
app.post('/jobs', createJob)
app.post('/image/:id', upload.single('image'), uploadJobImage)
app.post('/rgnotification', registWebNotification)
app.post('/send_notification', sendWebNotification)

app.get('/public_key', getPublicKey)
app.get('/jobs', getAllJobs)
app.get('/userjobs', getJobsByUser)
app.get('/job/:id', getJobById)
app.get('/user', getUserById)
app.get('/image/:id', displayJobImage)

app.patch('/user/pushtoken', updatePushToken)

app.delete('/job/:id', deleteJob)
app.delete('/image/:id', delImage)




app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server running at http://localhost:3003')
})
