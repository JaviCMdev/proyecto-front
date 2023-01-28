
import React, { useState, useEffect } from 'react';
import './Admin.css';

import { useNavigate } from 'react-router-dom';

//Imports RDX
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';
import { serieData } from '../../serieSlice';

export const Admin = () => {

    //Instancio useNavigate
    const navigate = useNavigate();

    //Instancio RDX
    const userRDX = useSelector(userData);
    const dataRDX = useSelector(serieData)

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        //Me conecto a redux para ver las credenciales de usuario y comprobar que su rol es admin...
        if (userRDX.userPass.rol !== 'admin') {
            navigate("/");
        }

    }, [])

    // useEffect(() => {

    //     if (allUsers.length === 0) {

    //         allUsersAdmin()
    //             .then(resultado => {

    //                 //seteo el hook de los usuarios...
    //                 setAllUsers(resultado);
    //             })
    //             .catch(error => console.log(error));
    //     };

    // }, [allUsers]);

    return (
        <div className='adminDesign'>
            <div>
                patata
                {console.log(dataRDX)}
            </div>
            {allUsers.length > 0 &&

                allUsers.map(
                    user => {
                        return (

                            <div key={user._id}>{user.name}</div>
                        )
                    }
                )
            }

        </div>
    )
};