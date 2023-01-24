
import React, { useState, useEffect } from 'react';
import { CardSerie } from '../../common/CardSerie/CardSerie';
import { getSeries } from '../../services/apiCalls';
import './Home.css';

import Loading from './loading.gif';

import { useNavigate } from 'react-router-dom';

//RDX imports......
import { useSelector, useDispatch } from "react-redux";
import { serieData, select } from '../serieSlice';

export const Home = () => {

    //Instancias de Redux........

    //Instanciamos dispatch para poder ejecutar accionces en el estado de Redux
    const dispatch = useDispatch();

    //Instanciamos los datos de las series desde Redux
    const datosReduxSeries = useSelector(serieData);

    //Instanciamos useNavigate en navigate para poder movernos por el router
    const navigate = useNavigate();

    const [series, setSeries] = useState([]);

    useEffect(() => {

        //Implementamos una condición para no modificar SIEMPRE el hook y asi evitamos
        //caer en un bucle infinito.

        if (series.length === 0) {

            setTimeout(() => {
                //Hago la llamada para traerme las series dentro de un settimeout para
                //emular una posible tardanza de estas al llegar y que de tiempo a ver
                //el gif de carga de tipo spinner

                getSeries()
                    .then(
                        resultado => {
                            //Ahora que resultado ya ha venido con las series, 
                            //guardo en el hook tan sólo las series, sin la info 
                            //de la conexión etc.... sólo las series

                            setSeries(resultado.data);
                        }
                    )
                    .catch(error => console.log(error));

            }, 1000);

        };

    }, [series]);

    // useEffect(() => {
    //     console.log("eeeeooooooooo", datosReduxSeries);
    // })

    const Choosen = (serie) => {

        //El primer paso ahora será guardar en Redux la serie escogida
        dispatch(select({ choosen: serie }))

        //Después de haber guardado ....... redirecciono a la vista o container del detalle de serie

        setTimeout(() => {
            navigate("/detail");
        }, 250);

    }

    return (
        <div className='homeDesign'>

            {datosReduxSeries.series.length > 0 ? (

                //Si entramos aqui es porque tenemos series de Redux....

                <div className='rosterDesign'>
                    {datosReduxSeries.series.map(
                        serie => {
                            return (
                                <div onClick={() => Choosen(serie)} key={serie._id}>
                                    <CardSerie serie={serie} />
                                </div>
                            )
                        }
                    )}
                </div>


            ) :

                (


                    series.length > 0 ? (

                        // Ya que el hook si contiene las series, es momento de mapearlas
                        // y poder mostrarlas en pantalla

                        <div className='rosterDesign'>
                            {series.map(
                                serie => {
                                    return (
                                        <div onClick={() => Choosen(serie)} key={serie._id}>
                                            <CardSerie serie={serie} />
                                        </div>
                                    )
                                }
                            )}
                        </div>

                    ) : (

                        <div><img className="loadingGif" src={Loading} alt="Cargando" /></div>

                    )

                )

            }

        </div>
    );
};












