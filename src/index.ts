import express, { Request, Response } from 'express'
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
      cb(null, `${new Date().getTime().toString(36)}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


import { getAllJobs } from './endpoints/getAllJobs'
import { createJob } from   './endpoints/createJob'
import { uploadJobImage } from './endpoints/uploadJobImage'
import { getJobById } from './endpoints/getJobById'
import { displayJobImage } from './endpoints/displayJobImage'
import { updatePushToken } from './endpoints/updatePushToken'
import { deleteJob } from './endpoints/deleteJob'


app.get('/jobs', getAllJobs)
app.get('/job/:id', getJobById)
app.get('/image/:id', displayJobImage)
app.post('/jobs', createJob)
app.post('/image/:id', upload.single('image'), uploadJobImage)
app.put('/pushtoken/:id', updatePushToken)
app.delete('/job/:id', deleteJob)




app.listen(process.env.PORT || 3003, ()=>{
  console.log('Server running at http://localhost:3003')
})
