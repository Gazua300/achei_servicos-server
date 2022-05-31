import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    margin-top: 10vh;
    form{
        margin-top: 5vh;
    }
    fieldset{
        width: 27vw;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 2px 2px 4px whitesmoke;
        legend{
            color: whitesmoke;
            text-align: center;
            font-size: 1.3rem;
        }
    }
    input{
        background: transparent;
        height: 20px;
        font-size: 1rem;
        color: whitesmoke;
        border-radius: 10px;
        margin-bottom: 10px;
        padding-left: 10px;
    }
    select{
        background: transparent;
        width: 216px;
        height: 25px;
        font-size: 1rem;
        border-radius: 10px;
        color: gray;
        option{
            color: black;
        }
    }    
`
export const Voltar = styled.button`
    height: 40px;
    width: 100px;
    border-radius: 30px;
    background-color: #151626;
    color: whitesmoke; 
    cursor: pointer;
    font-size: 12pt;
`
export const DetalheCard = styled.div`
    box-shadow: 2px 2px 4px #918bcb;
    border: 1px solid;
    width: 300px;
    padding: 10px;
    border-radius: 10px;
`
export const Titulo = styled.h1`
    text-align: center;
`
export const DivBtn = styled.div`
    text-align: center;
    padding: 15px;
`
export const Contratar = styled.button`
    background-color: #151626;
    border-radius: 10px;
    margin-top: 20px;
    color: whitesmoke;
    cursor: pointer;
    padding: 5px;
`
