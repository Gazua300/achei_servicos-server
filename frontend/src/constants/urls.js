export const BASE_URL = "https://more-deploys.herokuapp.com"
const token = localStorage.getItem('token')
export const headers = {
    headers: {
        Authorization: token
    }
}
