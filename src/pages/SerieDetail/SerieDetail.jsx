
import React, {useState} from 'react';
import './SerieDetail.css';

import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';

//Imports RDX
import { useSelector } from "react-redux";
import { serieData } from '../serieSlice';
import { userData } from '../User/userSlice';
import { postRent } from '../../services/apiCalls';

export const SerieDetail = () => {

    //Instanciar los datos de Redux...

    //Aqui me traigo los estados de redux, de ambos slices, es decir....

    //Primero me traigo los datos de la serie (detailRdx) y luego de user (detailUsr)
    //estos contienen todos los detalles de la película que mostramos y del usuario logeado
    const detailRdx = useSelector(serieData);
    const detailUsr = useSelector(userData);

    //Instancia navigate....
    const navigate = useNavigate();


    //Hooks
    const [msg, setMsg] = useState('');

    //Funciones....

    const RentMe = () => {

        //aquí llamaremos a la función que se comunica con la API
        //que podemos encontrarla en services
        //encargada de realizar el pedido....... le pasaremos detailRdx y detailUsr
        //porque ahi tendremos la id de user y la id de la peli

        //Vamos a recolectar los datos necesarios para hacer el alquiler y enviarlos al servicio

        let body = {

            //id de la serie...
            idSerie : detailRdx.choosen.id,
            idUser : detailUsr.userPass.user._id,
            rentalDate : dayjs().format('DD/MM/YYYY'),
            returnDate : dayjs().add(7, 'days').format('DD/MM/YYYY'),
            price : 5
        }

        postRent(body, detailUsr.userPass.token)
            .then(resultado => {
                //Esto se ejecutará si el pedido se ha realizado correctamente
                //mostrando el mensaje

                setMsg(resultado.data)


                //Después de haber realizado el pedido, llevamos al user a su perfil
                setTimeout(()=>{

                    navigate('/profile');
                },1500);
                
            })
            .catch(error => {

                setMsg(error.message);
            });
    }

    return(
        <div className='serieDesign'>
            {detailRdx.choosen.id !== '' &&
            
                <div className='serieDetailCard'>
                    <div>{detailRdx.choosen.title}</div>
                    <div><img className='detailPoster' src={`${detailRdx.choosen.poster_path}`}/></div>
                    <div>{detailRdx.choosen.description !== '' ? detailRdx.choosen.description : "No overview available"}</div>

                    {/* En caso de que el usuario esté logeado, es decir, tenemos sus credenciales en REDUX, mostraremos
                    un boton para poder alquilar la película */}

                    {detailUsr.userPass.token !== '' &&
                    
                        <div onClick={()=>RentMe()} className='rentDesign'>ALQUILAME</div>
                    }

                    <div>{msg}</div>
                </div>
            
            }
        </div>
    )

}