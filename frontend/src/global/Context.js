import axios from "axios"
import { createContext, useState, useEffect } from "react"
import { BASE_URL } from "../constants/urls"


const Context = createContext()

export const GlobalState = (props)=>{
    const [servicos, setServicos] = useState([])


    useEffect(()=>{
        axios.get(`${BASE_URL}/jobs`).then(res=>{
            setServicos(res.data)
        })
    }, [])

    const states = { servicos }
    const setters = {}
    const requests = {}

    return(
        <Context.Provider value={{ states, setters, requests }}>
            { props.children }
        </Context.Provider>
    )
}


export default Context