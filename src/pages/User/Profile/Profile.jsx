
import React, {useEffect} from 'react';
import './Profile.css';

import { useNavigate } from 'react-router-dom';

//Imports de RDX
//primero importo métodos que me permitirán conectarme para leer y modificar en redux
import { useSelector } from "react-redux";
import { userData } from '../userSlice';

export const Profile = () => {

    //Instancio useNavigate
    const navigate = useNavigate();

    //Instancio RDX
    const userRDX = useSelector(userData);
    
    useEffect(()=>{

        if(userRDX.userPass.token === ''){
            navigate("/");
        } else {
            //A este else entraremos si SI que tenemos el token....

            console.log(userRDX.userPass);
        }
    },[]);


    return (
        <div className='profileDesign'>

            <div>Nombre: {userRDX.userPass.name}</div>
            <div>Email: {userRDX.userPass.token.data.userFound[0].email}</div>
        
        </div>
    )
}