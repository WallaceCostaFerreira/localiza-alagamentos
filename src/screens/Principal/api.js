import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.0.0.104/localiza-alagamento-api',
    headers: {
        'content-type': 'application/json; odata.metadata=minimal; odata.streaming=true',
        'accept': 'application/json'
    },
    responseType: 'json'
});

export default api;

