import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { BASE_URL } from "../constants/urls"


const Context = createContext()

export const GlobalState = (props)=>{
    const navigate = useNavigate()
    const [servicos, setServicos] = useState([])
    const [servico, setServico] = useState({})


    useEffect(()=>{
        axios.get(`${BASE_URL}/jobs`).then(res=>{
            setServicos(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }, [])

    const contratarServico = (id)=>{
        axios.get(`${BASE_URL}/job/${id}`).then(res=>{
            setServico(res.data)
            navigate('/detalhe')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const states = { servicos, servico }
    const setters = {}
    const requests = { contratarServico }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            { props.children }
        </Context.Provider>
    )
}


export default Context