
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

//Importando imágenes.....
import Logo from './camera.png';

//RDX Imports

//primero importo métodos que me permitirán conectarme para leer y modificar en redux
import { useSelector, useDispatch } from "react-redux";
//a continuación, importo los datos del estado de la slice de user (userData) y la ACCION logout
import { userData, logout } from "../../pages/User/userSlice";
import { serieData, find, clear } from '../../pages/serieSlice';
import { InputText } from '../InputText/InputText';
import { getSearch } from '../../services/apiCalls';

export const Header = () => {

    //Al instanciar dispatch, lo podré usar para emitir ACCIONES de REDUX
    const dispatch = useDispatch();
    //Initial es un objeto de JavaScript que es igual que el estado de redux por defecto, 
    //para pasárselo luego cuando haga el logout
    const initial = {
        token: '',
        user: {}
    }

    //Hook para la búsqueda
    const[search , setSearch] = useState([]);

    //Guardo en la constante datosReduxUsuario, los datos que me traigo del state de redux (userData)
    const datosReduxUsuario = useSelector(userData);
    const datosReduxSeries = useSelector(serieData)
    // useEffect(() => {
    //     //Este useEffect lo hago para saber que contiene Redux la slice de user realmente....
    //     console.log(datosReduxUsuario);
    // })

    useEffect(()=>{

        if(search !== ""){

            //Procedemos a buscar...

            //Llamamos a la funcion del servicio que busca
            getSearch(search)
                .then(
                    resultado => {
                    
                        //Guardo en REDUX..........
                        dispatch(find({series : resultado.data}))
                    }
                )
                .catch(error=> console.log(error));

        //La condición de este else if nos indica que sólo entrará si la búsqueda está vacia y en redux no hay resultados
        //de búsquedas anteriores, eso nos OBLIGA a interpretar que antes se escribió algo para volver a dejarlo en las
        //comillas vacias.
        } else if(search === "" && datosReduxSeries.series.length > 0) {

            //Si borramos lo que había escrito o no nay nada, limpiamos las series de REDUX
            dispatch(clear({choosen : {}, series: []}));
        } 

    },[search])

    //Instanciamos el método useNavigate para poder utilizarlo

    const navigate = useNavigate();

    const logOff = () => {
        dispatch(logout({ userPass: initial }))

        navigate("/")
    }

    const handleSearch = (e) => {

        //Esta funcionalidad setSearch de tipo setter lo que hace es cambiar el valor del hook search
        setSearch(e.target.value);
        
    }

    const ResetHome = () => {

        //primero limpiamos búsquedas posibles de Redux
        dispatch(clear({choosen : {}, series: []}));

        //redirigimos a Home
        navigate("/")

    }

    const searchErrorHandler = (e) => {

        console.log("comprobamos mañana la búsqueda");
    }


    //Ejecuto el condicional if, para.....
    //Primero, en caso de que el token contenga algo que no sean comillas vacias, mostrar la opcion de logout y el nombre de usuario

    return (
        <div className='headerDesign'>
            <div onClick={()=>ResetHome()} className='logoDesignHeader'><img id="logoHome" className='cameraAvatar' src={Logo} alt="Camara"/></div>
            <div className='searchDesign'>

                <InputText 
                    type={"text"} 
                    name={"search"} 
                    className={'inputDesign'} 
                    placeholder={"Introduce la busqueda"} 
                    functionHandler={handleSearch} 
                    errorHandler={searchErrorHandler}
                />
            </div>

            <div className='headerLinksDesign'>
                {/* Introducimos el logo, independientemente de lo que nos vaya a sacar después */}

                {/* Renderizado condicional por si el usuario es admin y hay que mostrar la sección de Admin */}

                {datosReduxUsuario.userPass.rol === "admin" &&
                
                
                    <div onClick={()=>navigate("/admin")} className='linkDesign'>admin</div>
                
                }

                {/* Renderizado condicional por si el usuario sí está logeado... */}
                {datosReduxUsuario.userPass.token !== "" ?

                    (<>
                        <div onClick={()=>navigate("/profile")} className='linkDesign' >{datosReduxUsuario.userPass?.name}</div>
                        {/* Para hacer logout, emitimos la accion logout desde el dispatch, dando como valor
    a userPass del estado de Redux el contenido de initial, es decir...lo reiniciamos o vaciamos,
    al no tener token ni datos de usuario, dejaremos de estar logeados */}
                        <div className='linkDesign' onClick={() => logOff()}>logout</div>
                    </>)


                    : (//Entraremos en el else si el token que hay en Redux está vacio (comillas vacias.)....
                        //La primera vez que entramos en la aplicación, siempre entrará aquí por defecto

                        <>
                            <div className='linkDesign' onClick={() => setTimeout(() => { navigate("/login") }, 200)}>login</div>
                            <div className='linkDesign' onClick={() => setTimeout(() => { navigate("/register") }, 200)}>register</div>
                        </>
                    )
                }

            </div>
        </div>


    );


};


