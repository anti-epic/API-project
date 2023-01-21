
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './deleteSpot.css';

const DeleteSpot = ({}) => {
    const history = useHistory();
    const dispatch = useDispatch();
   const {spotId} =  useParams();
    const spotObj = useSelector(state => state.spots);






if(!spotObj){
    return null
}

const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId));

 history.push(`/`);
}

    return(

    <div className='deleteSpotContainer'>


        <form className='deleteSpotForm' onSubmit={handleSubmit}>
       <h1 className='deleteHeader'> Once deleted you can never recover the spot </h1>
        <input className='deleteSpotButton'type='submit' value="DELETE FOREVER" />
        </form>



    </div>




    );
}



export default DeleteSpot
