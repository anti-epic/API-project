import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {getSpots} from '../../store/spots';
import './AllSpots.css';

const AllSpots = () => {

    const dispatch = useDispatch();

    const spotsObj = useSelector(state => {
        return state.spots
    })


    // const spotsObj = dispatch(getSpots());
    const spots = Object.values(spotsObj);
    useEffect(() => {
        dispatch(getSpots())
      },[dispatch])
    console.log(spots[1], 'lastone')
    if(!spots){
        return null
    }

    return (
        <div className='container'>test
           <div className='spots-container'>
                {spots.map((spot) => (
                    <button className="spotButton">
                    <div className='cards'>
                        <img  className="cardImage" src={spot.previewImage}/>
                        <div className='cardInfo' >
                            <div className="cityState">  {spot.city},{spot.state}</div>
                            <div className="avgRating">     <i className="fa-solid fa-star fa-2xs"></i> {Number(spot.avgRating).toFixed(2)} </div>
                            <br></br>
                            <div className='priceLine'><div className="price">${spot.price}</div>night</div>
                        </div>


                    </div>
                    </button>
                ))}

            </div>
    </div>

    );

}


export default AllSpots
