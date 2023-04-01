import os from 'os'
import webPush from 'web-push'
import { config } from 'dotenv'


config()


export const getHostAddress = ()=>{
    const networkInterfaces = os.networkInterfaces()
    
    let hostAddress

    Object.keys(networkInterfaces).forEach(key=>{
        networkInterfaces[key]?.forEach(networkInterface=>{
            if(!networkInterface.internal && networkInterface.family === 'IPv4'){
                hostAddress = networkInterface.address
            }
        })
    })

    return hostAddress
}