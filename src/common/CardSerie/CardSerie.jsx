
import React from 'react';
import './CardSerie.css';

export const CardSerie = ({serie}) => {
    
    return (
        <div className='cardSerieDesign'>
            <div>{serie.title !== '' ? serie.title : "Nombre no disponible"}</div>
            <div><img className='posterDesign' src={`${serie.poster_path}`}/></div>
        </div>
    )
}