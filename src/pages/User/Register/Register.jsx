
import React, { useState, useEffect } from 'react';
import { InputText } from '../../../common/InputText/InputText';
import { errorCheck } from '../../../services/utiles';
import './Register.css';

export const Register = () => {

    const [usuario, setUsuario] = useState({
        name: '',
        password: '',
        email: '',
    })

    const [usuarioError, setUsuarioError] = useState({
        nameError: '',
        passwordError: '',
        emailError: '',
    })

    const registerInputHandler = (e) => {

        //Manejo la entrada de datos en los input y voy actualizando el hook usuario a medida
        //que los datos se van introduciendo

        //Bindear (atar)
        setUsuario((prevState)=>({...prevState, 
            [e.target.name] : e.target.value
            
        }));;

    }

    const registerErrorHandler = (e) => {

        let error = '';

        error = errorCheck(e.target.name, e.target.value);


        setUsuarioError((prevState)=>({...prevState, 
            [e.target.name + 'Error'] : error
        }));
        
    }

    return (
        <div className='registerDesign'>
            {/* <pre>{JSON.stringify(usuario, null, 2)}</pre> */}
            <InputText 
                type={'text'} 
                name={'name'} 
                className={usuarioError.nameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={'nombre'} functionHandler={registerInputHandler} 
                errorHandler={registerErrorHandler}
            />
            <div className='errorText'>{usuarioError.nameError}</div>
            <InputText 
                type={'password'} 
                name={'password'} 
                className={usuarioError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={'pass'} 
                functionHandler={registerInputHandler} 
                errorHandler={registerErrorHandler}
            />
            <div className='errorText'>{usuarioError.passwordError}</div>
            <InputText 
                type={'text'} 
                name={'phone'} 
                className={usuarioError.phoneError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={'telf'} 
                functionHandler={registerInputHandler} 
                errorHandler={registerErrorHandler}
            />
            <div className='errorText'>{usuarioError.phoneError}</div>
            <InputText 
                type={'text'} 
                name={'country'} 
                className={usuarioError.countryError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={'pais'} 
                functionHandler={registerInputHandler} 
                errorHandler={registerErrorHandler}
            />
            <div className='errorText'>{usuarioError.countryError}</div>
            <InputText 
                type={'email'} 
                name={'email'} 
                className={usuarioError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} 
                placeholder={'correo'} 
                functionHandler={registerInputHandler} 
                errorHandler={registerErrorHandler}
            />
            <div className='errorText'>{usuarioError.emailError}</div>
        </div>
    );
};