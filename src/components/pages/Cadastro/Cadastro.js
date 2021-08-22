import React from 'react'
import { BtnCadastrar, Corpo} from "./styled"
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
            paymentMethods: this.state.pagamento,
            dueDate: this.state.prazo
        }
        
        axios.post(`${BASE_URL}/jobs`, body, headers)
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
            alert(err.response.data.message)
            console.log(err.response.data.message)
        })
    }

    render(){
        return <div>
            <Corpo>
                <h1>Lista de Serviços</h1>
                
                    <p><input value={this.state.titulo} onChange={this.mudarTitulo} 
                    style={{width: '300px', height: '30px', background: 'transparent', color:'whitesmoke', fontSize:'1.2rem'}} type="text" placeholder='Título'/></p>
                    
                    <input value={this.state.descricao} onChange={this.mudarDescricao} 
                    type='text' placeholder='Descrição' style={{width: '300px', height: '30px', background: 'transparent', color:'whitesmoke', fontSize:'1.2rem'}}/>
                    
                    <p><input value={this.state.preco} onChange={this.mudarPreco} placeholder='Preço'
                    type='number' min='0' style={{width: '300px', height: '30px', background: 'transparent', color:'whitesmoke', fontSize:'1.2rem'}}/> </p>
                
                <select value={this.state.pagamento} onChange={this.mudarPagamento} 
                style={{width: '300px', background: 'transparent', color: 'gray', color:'whitesmoke', fontSize:'1.2rem'}} multiple >
                    <option>Cartão de Crédito</option>
                    <option>Cartão de Débito</option>
                    <option>PayPal</option>
                    <option>Boleto</option>
                    <option>Pix</option>
                </select>
                <p><input value={this.state.prazo} onChange={this.mudarData} 
                style={{width: '300px', height: '30px', background: 'transparent', color:'whitesmoke', fontSize:'1.2rem'}} type='date' /></p>
                <BtnCadastrar onClick={this.cadastrarServico} >Cadastrar serviço</BtnCadastrar>&nbsp;&nbsp;&nbsp;
                <BtnCadastrar onClick={()=> this.props.mudaTela('lista')} >Ir para lista</BtnCadastrar>
            </Corpo>            
        </div>
    }
}
