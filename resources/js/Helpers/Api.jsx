import axios from "axios";

const apiRequest = async (url, options = {}, method = 'get') => {

    let axios_params = {
        method: method,
        url: url,
        responseType: 'json',
    }

    if (options) {
        axios_params = {...axios_params, ...options}
    }
    return axios(axios_params);
}

export default apiRequest;
