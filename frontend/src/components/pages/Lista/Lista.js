import React from 'react'
import {QuadroLista, BtnLista, InputDiv} from './styled'
import axios from 'axios'
import {BASE_URL, headers} from '../../../constants/urls'
import {convertDate} from '../../../utilidades/util'


export default class Lista extends React.Component{
    state = {
        listaServicos: [],
        minVal: '',
        maxVal: '',
        busca: '',
        ordem: ''
    }

    componentDidMount(){
        this.pegarLista()
        //this.filtro()
    }


    mudarMinVal = (e)=>{
        this.setState({minVal: e.target.value})
    }
    mudarMaxVal = (e)=>{
        this.setState({maxVal: e.target.value})
    }
    mudarBusca = (e)=>{
        this.setState({busca: e.target.value})
    }
    mudarOrdem = (e)=>{
        this.setState({ordem: e.target.value})
    }

    pegarLista =()=>{
        axios.get(`${BASE_URL}/jobs`, headers)
        .then((res)=>{
            this.setState({
                listaServicos:res.data.jobs
            })
            console.log(res.data.jobs)
           }).catch((err)=>{console.log(err)})
    }


    
    render(){

        const filtro = this.state.listaServicos.filter(item=>{
            return this.state.minVal < item.price
        }).filter(item=>{
            return this.state.maxVal === '' || this.state.maxVal >= item.price
        }).filter(item=>{
            return this.state.busca === '' || this.state.busca.toLowerCase().includes(item.title.toLowerCase())
        }).sort((servicoAtual, proximo)=>{
            switch(this.state.ordem){
                case 'Título':
                    return servicoAtual.title.localeCompare(proximo.title)
                case 'Preço':
                    return servicoAtual.price - proximo.price
                case 'Prazo':
                    return new Date(servicoAtual.dueDate).getTime() -
                           new Date(proximo.dueDate).getTime()
            }
        })

        const mostrar = filtro.map((servico)=>{
            return <QuadroLista key={servico.id} servico={servico}>
            <p><b>Título: </b>{servico.title}</p>
            <b>Preço: R$ </b>{servico.price.toFixed(2)}
            <p><b>Prazo: </b>{convertDate(servico.dueDate)}</p>
            <BtnLista onClick={()=> this.props.irParaDetalhe(servico.id)} >Detalhe</BtnLista>&nbsp;&nbsp;&nbsp;
            <BtnLista onClick={()=> this.props.adicionarNoCarrinho(servico)} >Adicionar ao carrinho</BtnLista>
            </QuadroLista>
        })

        return <div>
            <InputDiv>
            <input type='text' placeholder='Valor mínimo'
            value={this.state.minVal} onChange={this.mudarMinVal}/>
            <input type='text' placeholder='Valor máximo' style={{marginLeft:'95px'}}
            value={this.state.maxVal} onChange={this.mudarMaxVal}/>
            <input type='text' placeholder='Título' style={{marginLeft:'80px',
            width:'100px'}} value={this.state.busca} onChange={this.mudarBusca}/>
            <select value={this.state.ordem} onChange={this.mudarOrdem}>
            <option selected>Sem ordenção</option>
            <option>Título</option>
            <option>Preço</option>
            <option>Prazo</option>
            </select>
            </InputDiv>
            {mostrar}
        </div>
    }
}
