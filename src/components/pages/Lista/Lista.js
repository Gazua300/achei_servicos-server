import React from 'react'
import {Voltar, QuadroLista, BtnLista, InputDiv} from './styled'
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
    
    
    pegarLista = ()=>{
        axios.get(`${BASE_URL}/jobs`, headers)
        .then((res)=>{
            this.setState({listaServicos: res.data.jobs})
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err.response)
            alert('Something went wrong!')       
        })
    }
    
    /*filtro = ()=>{
               
        const novaLista = this.state.listaServicos
        .filter((servico)=>{
            servico.price >= Number(this.state.minVal)
        })
    }*/

    render(){
        const mostrar = this.state.listaServicos.map((servico)=>{
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
            style={{width: '270px', height: '30px', background: 'transparent', marginRight: '45px'}}
            value={this.state.minVal} onChange={this.mudarMinVal} />
            <input type='text' placeholder='Valor máximo'
            style={{width: '270px', height: '30px', background: 'transparent', marginRight: '45px'}}
            value={this.state.maxVal} onChange={this.mudarMaxVal} />
            <input type='text' placeholder='Busca por título ou descrição'
            style={{width: '270px', height: '30px', background: 'transparent', marginRight: '45px'}}
            value={this.state.busca} onChange={this.mudarBusca} />
            <select style={{width: '270px', height: '30px', background: 'transparent', color: 'gray'}}
            value={this.state.ordem} onChange={this.mudarOrdem} >
            <option>Sem ordenção</option>
            <option>Sem ordenção</option>
            <option>Sem ordenção</option>
            <option>Sem ordenção</option>
            <option>Sem ordenção</option>
            </select>
            </InputDiv>
            <Voltar onClick={()=> this.props.mudaTela('cadastro')} >Voltar</Voltar><br/>
            {mostrar}                                   
        </div>
    }
}
