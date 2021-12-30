import { useState, useEffect } from 'react'
import axios from 'axios'
import {BASE_URL} from '../../../constants/urls'
import { Container } from './styled'


const Login = (props)=>{
  const [form, setForm] = useState({
    email:'',
    password:''
  })


  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(token){
      props.mudaTela('cadastro')
    }
  })


  const onChange = (e)=>{
    const { name, value } = e.target
    setForm({...form, [name]: value})
  }


  const logar = (e)=>{
    e.preventDefault()

    const body = {
      email: form.email,
      password: form.password
    }
    axios.post(`${BASE_URL}/jobs/login`, body).then(res=>{
      localStorage.setItem('token', res.data.access_token)
      props.mudaTela('cadastro')
    }).catch(err=>{
      console.log(err.response)
    })
  }

  return <Container>
           <form onSubmit={logar}>
            <fieldset>
            <legend>Login</legend>
            <input type='email' name='email' value={form.email} onChange={onChange}
              placeholder='E-mail' autoFocus required/>
            <input type='password' name='password' value={form.password} onChange={onChange}
              placeholder='Sua Senha' required/>
            <button>Entrar</button>
            </fieldset>
           </form>
         </Container>
}
export default Login
