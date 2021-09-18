import styled from 'styled-components'

export const Voltar = styled.button`
    height: 30px;
    width: 120px;
    border-radius: 30px;
    background-color: #151626;
    color: whitesmoke; 
    cursor: pointer;
    font-size: 13pt;
    margin: 5px;
`
export const QuadroLista = styled.div`
    border: 1px solid;
    width: 230px;
    display: inline-block;
    margin: 20px;
    padding: 15px;
    border-radius: 10px;
    &:hover{
       transform: scale(1.1);
       transition: 1s;
    }
`
export const BtnVoltar = styled.div`
    text-align: center;
`
export const BtnLista = styled.button`
    border-radius: 20px;
    background-color: #151626;
    color: whitesmoke;
    cursor: pointer; 
`
export const InputDiv = styled.div`
    margin: 15px;
    input{
        width: 200px;
        height: 20px;
        background: transparent;
        color: whitesmoke;
        font-size: 1rem;
        border-radius: 10px;
        margin-left: 3vw;
    }
    select{
        margin-left: 20px;
        height: 25px;
        background: transparent;
        color: gray;
    }
`
