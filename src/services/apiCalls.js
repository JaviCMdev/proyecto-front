import axios from 'axios';
const root = 'http://localhost:5500/';

export const postLogin = async (credenciales) => {
    return await axios.post(`${root}users/login`, credenciales);
};

export const postRegistered = async (body) => {
    return await axios.post(`${root}users/newuser`, body)
}

export const getSeries = async () => {
    return await axios.get(`${root}series/getall`);
}

export const getSearch = async (criterioBusqueda) => {
    return await axios.get(`${root}series/getall?title=${criterioBusqueda}&genre=${criterioBusqueda}`);
}

export const postRent = async (body, token) => {
    let config = {
        headers: { 
            'Authorization': 'Bearer ' + token
          }
    }
    return await axios.post(`${root}rentals/newRental`, body, config);
}

export const allUsersAdmin = async (token) => {
    let config = {
        headers: { 
            'Authorization': 'Bearer ' + token
          }
    }
    return await axios.get(`${root}rentals/getAll`, config);
}