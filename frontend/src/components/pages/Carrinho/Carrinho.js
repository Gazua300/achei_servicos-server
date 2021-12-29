import React from 'react'
import {QuadroCarro, Remove, QuadroFinal} from './styled'

export default class Carrinho extends React.Component{
     render(){
        const mostrar = this.props.carrinho.map((item)=>{
            return <QuadroCarro>
                <b>{item.title}</b>
                R$ {item.price.toFixed(2)}
                <Remove onClick={()=> this.props.removerDoCarrinho(item.id)} >Remover</Remove>                
            </QuadroCarro>
        })
        
        let total = 0
        
        this.props.carrinho.forEach((item)=>{
            total += item.price
        })
        return <div>
                        
                {mostrar}
                <QuadroFinal>
                <b>Total: R$ {total.toFixed(2)}</b>
                <Remove onClick={this.props.limparCarrinho}>Limpar carrinho</Remove>
                <Remove onClick={()=> this.props.mudaTela('lista')}>Voltar</Remove>
                </QuadroFinal>
                        
        </div>
    }
}