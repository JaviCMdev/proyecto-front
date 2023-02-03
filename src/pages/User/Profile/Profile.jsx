import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';
import { CardRental } from '../../../common/CardRental/CardRental';

export const Profile = () => {
    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allRentals, setAllRentals] = useState([]);

    useEffect(() => {
        if (userRDX.userPass.token === '') {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (allRentals.length === 0) {
            allUsersAdmin()
                .then(resultado => {
                    setAllRentals(resultado.data);
                })
                .catch(error => console.log(error));
        };

    }, [allRentals]);

    const filterName = allRentals.filter((name) => name.nameUser === userRDX.userPass.name)

    return (
        <div className='profileDesign'>
            <div>Nombre: {userRDX.userPass.name}</div>
            <div>Email: {userRDX.userPass.token.data.userFound[0].email}</div>
            <div className='rosterDesign'>
                {allRentals.length > 0 &&
                    filterName.map(
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
}