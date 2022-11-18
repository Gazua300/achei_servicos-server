import { v4 } from 'uuid'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
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
      { expiresIn: '1m'}
    )
  }

  tokenData = (token:string)=>{
    return jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as JwtPayload
  }

  hash = (txt:string)=>{
    const rounds = 12
    const salt = bcrypt.genSaltSync(rounds)
    const cypher = bcrypt.hashSync(txt, salt)

    return cypher
  }

  compare = (txt:string, hash:string)=>{
    return bcrypt.compareSync(txt, hash)
  }
}
