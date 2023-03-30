import express from 'express'
import cors from 'cors'
import multer from 'multer'


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


import { getAllJobs } from './endpoints/getAllJobs'
import { createJob } from   './endpoints/createJob'
import { getJobById } from './endpoints/getJobById'
import { deleteJob } from './endpoints/deleteJob'

import { uploadJobImage } from './endpoints/uploadJobImage'
import { displayJobImage } from './endpoints/displayJobImage'
import { delImage } from './endpoints/delImage'

import { updatePushToken } from './endpoints/updatePushToken'


app.get('/jobs', getAllJobs)
app.get('/job/:id', getJobById)
app.get('/image/:id', displayJobImage)
app.post('/jobs', createJob)
app.post('/image/:id', upload.single('image'), uploadJobImage)
app.put('/pushtoken/:id', updatePushToken)
app.delete('/job/:id', deleteJob)
app.delete('/image/:id', delImage)




app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server running at http://localhost:3003')
})
