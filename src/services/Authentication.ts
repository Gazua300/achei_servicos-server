import { v4 } from 'uuid'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export class Authentication {
  generateId = ()=>{
    return v4()
  }

  token = (payload:string)=>{
    return jwt.sign(
      { payload },
      process.env.JWT_KEY as string,
      { expiresIn: '24h'}
    )
  }

  tokenData = (token:string)=>{
    return jwt.verify(
      token,
      process.env.JWT_KEY as string
    )
  }
}
