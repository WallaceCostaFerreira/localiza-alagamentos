import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.1.106/apsApp/localiza-alagamento-api',

    headers: {
        'content-type': 'application/json; odata.metadata=minimal; odata.streaming=true',
        'accept': 'application/json'
    },
    responseType: 'json'
});

export default api;

