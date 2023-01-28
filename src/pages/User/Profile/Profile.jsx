
import React, {useState, useEffect} from 'react';
import './Profile.css';

import { useNavigate } from 'react-router-dom';


//Imports de RDX
//primero importo métodos que me permitirán conectarme para leer y modificar en redux
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';
import { CardRental } from '../../../common/CardRental/CardRental';



export const Profile = () => {

    //Instancio useNavigate
    const navigate = useNavigate();

    //Instancio RDX
    const userRDX = useSelector(userData);
    const [allRentals, setAllRentals] = useState([]);
    
    useEffect(()=>{

        if(userRDX.userPass.token === ''){
            navigate("/");
        } else {
            //A este else entraremos si SI que tenemos el token....

            console.log(userRDX.userPass);
        }
    },[]);

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


const filterName = allRentals.filter((name) => name.nameUser === userRDX.userPass.name)

    return (
        <div className='profileDesign'>
            <div>Nombre: {userRDX.userPass.name}</div>
            <div>Email: {userRDX.userPass.token.data.userFound[0].email}</div>
            <div className='rosterDesign'>
                {allRentals.length > 0 &&
                    filterName.map(
                        rental =>  {
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