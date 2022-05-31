import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Context from '../../global/Context'
import { Container, Voltar, DetalheCard, Titulo, DivBtn, Contratar } from './styled'
import { BASE_URL } from '../../constants/urls'


const Detalhe = ()=>{
    const { states } = useContext(Context)
    const servico = states.servico
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name:'',
        email:'',
        payment:''
    })

    const onChange = (e)=>{
        const { name, value } = e.target
        setForm({...form, [name]:value})
    }

    


    const contratarServico = (e)=>{
        e.preventDefault()

        const body = {
            name: form.name,
            email: form.email,
            payment: form.payment
        }
        axios.post(`${BASE_URL}/job`, body).then(res=>{
            console.log(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    return(
        <Container>
            <DetalheCard>
                <Titulo>{servico.title}</Titulo>
                <p><b>Descrição: </b>{servico.description}</p>
                <b>Preço: </b>R$ {servico.price}.00
                <p><b>Prazo: </b> {servico.dueDate}</p>
                <b>Formas de pagamento: </b>{servico.payment}
            </DetalheCard>
            <form onSubmit={contratarServico}>
                <fieldset>
                    <legend>Contrar serviço</legend>
                    <input type='text' name='name' value={form.name} onChange={onChange}
                        placeholder='Nome' required/><br/>
                    <input type='email' name='email' value={form.email} onChange={onChange}
                        placeholder='nome@email.com' required/><br/>
                    <select name='payment' value={form.payment} onChange={onChange} required>
                        <option defaultChecked>Pagamento</option>
                        <option>Débito</option>
                        <option>Crédito</option>
                        <option>Pix</option>
                        <option>Boleto</option>
                    </select>
                <Contratar>Contratar</Contratar>
                </fieldset>
            </form>
            <DivBtn>
                <Voltar onClick={()=> navigate('/lista')}>Voltar</Voltar>
            </DivBtn>
        </Container>
    )
}
export default Detalhe