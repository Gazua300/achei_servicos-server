import React from 'react'
import { BtnCadastrar, Corpo} from "./styled"
import axios from 'axios'
import {BASE_URL} from '../../../constants/urls'


export default class Cadastro extends React.Component{
    state = {
        titulo: '',
        descricao: '',
        preco: '',
        pagamento: [],
        prazo: ''
    }

    mudarTitulo = (e)=>{
        this.setState({titulo: e.target.value})
    }
    mudarDescricao = (e)=>{
        this.setState({descricao: e.target.value})
    }
    mudarPreco = (e)=>{
        this.setState({preco: e.target.value})
    }
    mudarPagamento = (e)=>{
        let value = Array.from(e.target.selectedOptions, option => option.value)
        this.setState({pagamento: value})
    }
    mudarData = (e)=>{
        this.setState({prazo: e.target.value})
    }

    cadastrarServico = ()=>{
        const body = {
            title: this.state.titulo,
            description: this.state.descricao,
            price: Number(this.state.preco),
            payment: this.state.pagamento,
            dueDate: this.state.prazo
        }
console.log(this.state.prazo)
        axios.post(`http://localhost:3003/jobs`, body)
        .then((res)=>{
            alert(`${this.state.titulo} criado com sucesso!`)
            this.setState({
                titulo: '',
                descricao: '',
                preco: '',
                pagamento: [],
                prazo: ''
            })
            console.log(res.data)
        })
        .catch((err)=>{
            alert(err.response.data)
            console.log(err.response.data)
        })
    }

    render(){
        return <div>
            <Corpo>
                <h1>Cadastrar um serviço</h1>

                    <p><input value={this.state.titulo} onChange={this.mudarTitulo}
                    type="text" placeholder='Título'/></p>
                    <input value={this.state.descricao} onChange={this.mudarDescricao}
                    type='text' placeholder='Descrição' />
                    <p><input value={this.state.preco} onChange={this.mudarPreco} placeholder='Preço'
                    type='number' min='0'/> </p>
                <select value={this.state.pagamento} onChange={this.mudarPagamento}
                style={{width: '250px', background: 'transparent', color:'whitesmoke', fontSize:'1rem'}} multiple >
                    <option>Cartão de Crédito</option>
                    <option>Cartão de Débito</option>
                    <option>PayPal</option>
                    <option>Boleto</option>
                    <option>Pix</option>
                </select>
                <p><input value={this.state.prazo} onChange={this.mudarData} type='date' /></p>
                <BtnCadastrar onClick={this.cadastrarServico} >Cadastrar serviço</BtnCadastrar>&nbsp;&nbsp;&nbsp;
                <BtnCadastrar onClick={()=> this.props.mudaTela('lista')} >Ir para lista</BtnCadastrar>
            </Corpo>
        </div>
    }
}
