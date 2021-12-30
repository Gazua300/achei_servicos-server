import styled from 'styled-components'


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25vh;
  fieldset{
    width: 20vw;
    padding: 30px;
    box-shadow: 3px 3px 6px black;
  },
  input{
    margin-bottom: 10px;
    background: transparent;
    height: 30px;
    border-radius: 10px;
    color: whitesmoke;
    font-size: 1.2rem;
  },
  legend{
    font-size: 1.5rem;
  },
  button{
    padding: 7px;
    border-radius: 10px;
  }
`
