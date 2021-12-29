import React from "react"
import Home from './components/pages/Home/Home'
import Cadastro from './components/pages/Cadastro/Cadastro'
import Carrinho from './components/pages/Carrinho/Carrinho'
import Detalhe from './components/pages/Detalhe/Detalhe'
import Lista from './components/pages/Lista/Lista'
import { createGlobalStyle } from "styled-components"
import Background from './components/img/ninjaWallpaper.jpg'
import {Head, BtnHead} from './styled'


const GlobalStyle = createGlobalStyle`
  body{
    background-image: url(${Background});
    background-size: cover;
    margin: 0;
    padding: 0;
    width: 100vw;
    color: #918bcb;
  }
`

export default class App extends React.Component {
  state = {
      telaAtual: 'home',
      servicoDetalheId: '',
      carrinho: []
  }

  mudaTela = (tela)=>{
    this.setState({telaAtual: tela})
  }

  irParaDetalhe = (idServico)=>{
      this.setState({telaAtual: 'detalhe', servicoDetalheId: idServico})
  }

  adicionarNoCarrinho = (servicoAdicionado)=>{
      const novoCarro = [...this.state.carrinho, servicoAdicionado]
      this.setState({carrinho: novoCarro})
      alert(`O serviço ${servicoAdicionado.title} foi adicionado ao carrinho.`)
  }
  removerDoCarrinho = (id)=>{
      const confirme = window.confirm('Tem certeza que deseja remover o seriço?')
      if(confirme){
          const novoCarro = this.state.carrinho.filter((carroItem)=>{
              return carroItem.id !== id
          })
          this.setState({carrinho: novoCarro})
      }
  }
  limparCarrinho = ()=>{
      const confirme = window.confirm('Isso irá apagar todos os itens. Desjea continuar?')
      if(confirme){
          this.setState({carrinho: []})
      }
  }

  renderizaTela = ()=>{
    switch(this.state.telaAtual){
      case 'home':
        return <Home mudaTela={this.mudaTela} />
      case 'cadastro':
        return <Cadastro mudaTela={this.mudaTela} />
      case 'carrinho':
        return <Carrinho mudaTela={this.mudaTela} limparCarrinho={this.limparCarrinho} removerDoCarrinho={this.removerDoCarrinho}
        carrinho={this.state.carrinho} />
      case 'detalhe':
        return <Detalhe mudaTela={this.mudaTela} idServico={this.state.servicoDetalheId} />
      case 'lista':
        return <Lista irParaDetalhe={this.irParaDetalhe} mudaTela={this.mudaTela} adicionarNoCarrinho={this.adicionarNoCarrinho} />
    }
  }


  render(){
    return (
      <div>
        <GlobalStyle/>
            <Head>
                <h1>LabeNinjas</h1>
                <div>
                <BtnHead onClick={()=> this.mudaTela('home')} >Home</BtnHead>&nbsp;&nbsp;&nbsp;
                <BtnHead onClick={()=> this.mudaTela('carrinho')} >Carrinho</BtnHead>
                </div>
            </Head>
            <hr/>
        {this.renderizaTela()}
      </div>
    )
  }
}
