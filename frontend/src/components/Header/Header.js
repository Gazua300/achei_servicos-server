import React from 'react'
import {Head, BtnHead, BtnDiv, Titulo} from './styled'


const Header = (props)=>{
        return <div>
            <Head>
                <Titulo>LabeNinjas</Titulo>
                <BtnDiv>
                <BtnHead onClick={()=> props.mudaTela('home')} >Home</BtnHead>&nbsp;&nbsp;&nbsp;
                <BtnHead onClick={()=> props.mudaTela('carrinho')} >Carrinho</BtnHead>
                </BtnDiv>
            </Head>
        </div>
}    
export default Header        
        

