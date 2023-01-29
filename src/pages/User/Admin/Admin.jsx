import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';
import { CardRental } from '../../../common/CardRental/CardRental';

export const Admin = () => {
    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allRentals, setAllRentals] = useState([]);

    useEffect(() => {
        if (userRDX.userPass.rol !== 'admin') {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (allRentals.length === 0) {
            allUsersAdmin()
                .then(resultado => {
                    setAllRentals(resultado.data);
                })
                .catch(error => console.log(error));
        };
    }, [allRentals]);

    return (
        <div className='adminDesign'>
            <div>Todos los alquileres</div>
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