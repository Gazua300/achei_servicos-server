import React from "react"
import { BtnCorpo, Corpo, P } from "./styled"
import Logo from '../../img/ninja.png'

export default class Home extends React.Component{
    render(){
        return <div>
            <Corpo>
                <h1>LabeNinjas</h1>
                <img src={`${Logo}`} alt='Imagem de logo'/>
                <P><b>O talento certo no momento certo</b></P>
                <BtnCorpo onClick={()=> this.props.mudaTela('login')} >Quero ser um ninja</BtnCorpo>&nbsp;&nbsp;&nbsp;
                <BtnCorpo onClick={()=> this.props.mudaTela('lista')} >Contratar um ninja</BtnCorpo>
            </Corpo>
        </div>
    }
}
