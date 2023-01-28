
import React, { useState, useEffect } from 'react';
import './Admin.css';

import { useNavigate } from 'react-router-dom';

//Imports RDX
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';
import { CardRental } from '../../../common/CardRental/CardRental';


export const Admin = () => {

    //Instancio useNavigate
    const navigate = useNavigate();

    //Instancio RDX
    const userRDX = useSelector(userData);
    // const rentalRDX = useSelector(rentalData)

    const [allRentals, setAllRentals] = useState([]);

    useEffect(() => {
        //Me conecto a redux para ver las credenciales de usuario y comprobar que su rol es admin...
        if (userRDX.userPass.rol !== 'admin') {
            navigate("/");
        }

    }, [])

    useEffect(() => {
        if (allRentals.length === 0) {

            allUsersAdmin()
                .then(resultado => {

                    //seteo el hook de los usuarios...
                    setAllRentals(resultado.data);
                })
                .catch(error => console.log(error));
        };

    }, [allRentals]);


    return (
        <div className='adminDesign'>
            <div className='rosterDesign'>
                {allRentals.length > 0 &&
                    allRentals.map(
                        rental => {
                            return (
                                <div key={rental._id}>
                                    <CardRental rental={rental} />
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
};