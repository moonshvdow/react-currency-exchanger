import axios from "axios";


axios.defaults.baseURL = "https://cdn.cur.su/api";


export const getRates = async () => {
    const {data} = await axios.get('/latest.json')
    return data.rates;
}
