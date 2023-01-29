import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../../../common/InputText/InputText';
import { postLogin } from '../../../services/apiCalls';
import { Decoder, errorCheck } from '../../../services/utiles';
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from '../userSlice';
import './Login.css';

export const Login = () => {
    const dispatch = useDispatch();
    const datosReduxUsuario = useSelector(userData);
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })
    const [credencialesError, setErrorCredenciales] = useState({
        emailError: '',
        passwordError: ''
    })
    const navigate = useNavigate();
    const InputHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));;
    }
    const Logeame = () => {
        for (const property in credencialesError) {
            if (credencialesError[property] !== '') {
                return;
            }
        }
        postLogin(credenciales)
            .then(
                resultado => {
                    let decodificado = Decoder(resultado.data.token);

                    let userPass = {
                        token: resultado,
                        user: decodificado.id,
                        name: resultado.data.userFound[0].name,
                        rol: resultado.data.userFound[0].rol,
                    }
                    dispatch(login({ userPass: userPass }));
                    setTimeout(() => {
                        navigate("/")
                    }, 750);
                }
            )
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (datosReduxUsuario.userPass.token !== '') {
            navigate("/");
        }
    }, [])

    const loginErrorHandler = (e) => {
        let error = '';
        error = errorCheck(e.target.name, e.target.value);
        setErrorCredenciales((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }

    return (
        <div className='loginDesign'>
            <InputText
                type={"email"}
                name={"email"}
                className={credencialesError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={"Escribe tu email"}
                functionHandler={InputHandler}
                errorHandler={loginErrorHandler}
            />
            <div className='errorText'>{credencialesError.emailError}</div>
            <InputText
                type={"password"}
                name={"password"}
                className={credencialesError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={"Escribe tu contraseña"}
                functionHandler={InputHandler}
                errorHandler={loginErrorHandler}
            />
            <div className='errorText'>{credencialesError.passwordError}</div>
            <div className='loginButtonDesign' onClick={() => Logeame()}>LOGIN</div>
        </div>
    );
};