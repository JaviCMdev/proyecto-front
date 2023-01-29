import React, { useState } from 'react';
import './SerieDetail.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { serieData } from '../serieSlice';
import { userData } from '../User/userSlice';
import { postRent } from '../../services/apiCalls';

export const SerieDetail = () => {
    const detailRdx = useSelector(serieData);
    const detailUsr = useSelector(userData);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const RentMe = () => {
        const eu = "€"
        let body = {
            idSerie: detailRdx.choosen._id,
            titleSerie: detailRdx.choosen.title,
            idUser: detailUsr.userPass.user,
            nameUser: detailUsr.userPass.name,
            rentalDate: dayjs().format('DD-MM-YYYY'),
            returnDate: dayjs().add(7, 'days').format('DD-MM-YYYY'),
            price: 5 + eu
        }
        postRent(body, detailUsr.userPass.token.data.token)
            .then(resultado => {
                setMsg(resultado.data)
                setTimeout(() => {
                    navigate('/profile');
                }, 1500);
            })
            .catch(error => {
                setMsg(error.message);
            });
    }

    return (
        <div className='serieDesign'>
            {detailRdx.choosen.id !== '' &&
                <div className='serieDetailCard'>
                    <div>{detailRdx.choosen.title}</div>
                    <div><img className='detailPoster' src={`${detailRdx.choosen.poster_path}`} /></div>
                    <div>{detailRdx.choosen.genre !== '' ? detailRdx.choosen.genre : "No genre available"}</div>
                    <div>{detailRdx.choosen.year !== '' ? detailRdx.choosen.year : "TBA"}</div>
                    <div>{detailRdx.choosen.duration !== '' ? detailRdx.choosen.duration : "TBA"}</div>
                    <div>{detailRdx.choosen.description !== '' ? detailRdx.choosen.description : "No overview available"}</div>
                    {detailUsr.userPass.token !== '' &&
                        <div onClick={() => RentMe()} className='rentDesign'>ALQUILAME</div>
                    }
                </div>
            }
        </div>
    )
}