
import React from 'react';
import './CardRental.css';

export const CardRental = ({rental}) => {
    
    return (
        <div className='cardRentalDesign'>
            <div>Datos alquiler</div>
            <div>Usuario: {rental.nameUser !== '' ? rental.nameUser : "UserName"}</div>
            <div>Serie: {rental.titleSerie !== '' ? rental.titleSerie : "SerieName"}</div>
            <div>Fecha alquiler: {rental.rentalDate !== '' ? rental.rentalDate : "Date"}</div>
            <div>Fecha devolucion: {rental.returnDate !== '' ? rental.returnDate : "Date"}</div>
        </div>
    )
}