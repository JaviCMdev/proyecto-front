
import axios from 'axios';

const root = 'http://localhost:5500/';

export const postLogin = async (credenciales) => {

    return await axios.post(`${root}users/login`, credenciales);

    //Devuelvo un token hardcodeado
};

export const postRegister = async (body) => {

    //A continuación vemos como se enviaría el body por axios para el registro
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


    //Esta sería la forma en la que conectaríamos con la API para realizar el pedido

    // let config = {
    //     method: 'post', //aqui especifico el protocolo http
    //     url : `${root}/oders/neworder`, //este sería mi endpoint del backend
    //     body, //el body que contiene los datos
    //     headers: { 
    //         'Authorization': 'Bearer ' + token
    //       }
    // }

    // return await axios.post(config);


    //Las dos líneas que hay a continuación hacen referencia a poder hacer el pedido en este caso ya que no dispongo de una API
    const resultado = {data: 'El pedido se ha realizado correctamente'}
    return resultado;
    
}


//Endpoints para Admin

export const allUsersAdmin = async (token) => {

    //Esta sería la forma en la que conectaríamos con la API para traernos todos los users en modo admin

    let config = {
        method: 'post', //aqui especifico el protocolo http
        url : `${root}admin/allUsers`, //este sería mi endpoint del backend de admin que trae todos los users
        body, //el body que contiene los datos
        headers: { 
            'Authorization': 'Bearer ' + token
          }
    }

    return await axios.post(config);

    const resultado = [
        {id: 3,name: 'Pepito', surname: 'Garcia', age: 28 },
        {id: 2,name: 'Pepita', surname: 'Perez', age: 23},
        {id: 1,name: 'Manolito', surname: 'Sanchez', age: 18},
        {id: 56,name: 'Manolita', surname: 'Rodriguez', age: 50}
    ];

    return resultado;
}


