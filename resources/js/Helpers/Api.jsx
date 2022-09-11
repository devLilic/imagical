import axios from "axios";

const loadImages = async (url, options = {}, method = 'get', action = 'INIT_IMAGES') => {

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

export default loadImages;
