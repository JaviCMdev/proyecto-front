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

    return await axios.get(`${root}series/name/${criterioBusqueda}`);

}

//Funcion que alquila

export const postRent = async (body, token) => {

    let config = {
        headers: { 
            'Authorization': 'Bearer ' + token
          }
    }

    return await axios.post(`${root}rentals/newRental`, body, config);

}


//Endpoints para Admin

export const allUsersAdmin = async (token) => {

    //Esta sería la forma en la que conectaríamos con la API para traernos todos los users en modo admin

    // let body = {
    //     rol : 'admin'
    // }

    let config = {
        method: 'post', //aqui especifico el protocolo http
        url: `${root}users/admin`, //este sería mi endpoint del backend de admin que trae todos los users
        body,
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }


    return await axios.post(config);

    const resultado = [
        { _id: '63b6bbaa9d2c9441e219e0e2', name: 'Puquitas', email: 'puquitas@gmail.com' },
        
    ];

    return resultado;
}


