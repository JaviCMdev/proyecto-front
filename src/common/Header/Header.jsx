import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from './camera.png';
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../pages/User/userSlice";
import { serieData, find, clear } from '../../pages/serieSlice';
import { InputText } from '../InputText/InputText';
import { getSearch } from '../../services/apiCalls';

export const Header = () => {

    const dispatch = useDispatch();
    const initial = {
        token: '',
        user: {}
    }

    const [search, setSearch] = useState([]);

    const datosReduxUsuario = useSelector(userData);
    const datosReduxSeries = useSelector(serieData)

    useEffect(() => {

        if (search !== "") {

            getSearch(search)
                .then(
                    resultado => {
                        dispatch(find({ series: resultado.data }))
                    }
                )
                .catch(error => console.log(error));
        } else if (search === "" && datosReduxSeries.series.length > 0) {
            dispatch(clear({ choosen: {}, series: [] }));
        }

    }, [search])

    const navigate = useNavigate();

    const logOff = () => {
        dispatch(logout({ userPass: initial }))
        navigate("/")
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const ResetHome = () => {
        dispatch(clear({ choosen: {}, series: [] }));
        navigate("/")
    }

    const searchErrorHandler = (e) => {
        console.log(e);
    }

    return (
        <div className='headerDesign'>
            <div onClick={() => ResetHome()} className='logoDesignHeader'><img id="logoHome" className='cameraAvatar' src={Logo} alt="Camara" /></div>
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
                {datosReduxUsuario.userPass.rol === "admin" &&
                    <div onClick={() => navigate("/admin")} className='linkDesign'>admin</div>
                }
                {datosReduxUsuario.userPass.token !== "" ?
                    (<>
                        <div onClick={() => navigate("/profile")} className='linkDesign' >{datosReduxUsuario.userPass?.name}</div>
                        <div className='linkDesign' onClick={() => logOff()}>logout</div>
                    </>)
                    : (
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