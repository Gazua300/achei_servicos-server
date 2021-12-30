import React from 'react'
import { BtnCadastrar, BtnContainer, Corpo} from "./styled"
import axios from 'axios'
import {BASE_URL, headers} from '../../../constants/urls'


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

        axios.post(`${BASE_URL}/jobs`, body, headers)
        .then((res)=>{
            alert(`${this.state.titulo} criado com sucesso!`)
            localStorage.setItem('token', res.data.access_token)
            this.setState({
                titulo: '',
                descricao: '',
                preco: '',
                pagamento: [],
                prazo: ''
            })
        })
        .catch((err)=>{
            alert(err.response.data)
            console.log(err.response.data)
        })
    }


    logout = ()=>{
      const decide = window.confirm('Tem certeza que deseja deslogar seu usuário?')

      if(decide){
        localStorage.clear()
        this.props.mudaTela('home')
      }
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
                <BtnContainer>
                  <BtnCadastrar onClick={this.cadastrarServico} >Cadastrar serviço</BtnCadastrar>
                  <BtnCadastrar onClick={this.logout}>Logout</BtnCadastrar>
                  <BtnCadastrar onClick={()=> this.props.mudaTela('lista')} >Ir para lista</BtnCadastrar>
                </BtnContainer>
            </Corpo>
        </div>
    }
}
