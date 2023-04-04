import React from 'react';
import {NavLink, Route, useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getSpots} from '../../store/spots';
import './AllSpots.css';
import notFound from './not-found.png';
const AllSpots = () => {

    const dispatch = useDispatch();

    const spotsObj = useSelector(state => {
        return state.spots
    })


    const spots = Object.values(spotsObj);
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch, spots.length])
    if (! spots)
        return null





    return spots && (

        <div>
            <div className='spots-container'>
                {
                spots.map((spot) => (spot ? (

                    <NavLink key={
                            spot.id
                        }
                        to={
                            `/spots/${
                                spot.id
                            }`
                    }>
                        <button className="spotButton">
                            <div className='cards'>
                                <img className="cardImage"
                                    src={
                                        spot.previewImage
                                    }
                                    onError={
                                        ({currentTarget}) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = notFound;
                                        }
                                    }/>
                                <div className='cardInfo'>
                                    <div className="cityState">
                                        {
                                        spot.city
                                    },{
                                        spot.state
                                    }</div>
                                    <div className="avgRating">
                                        <i className="fa-solid fa-star fa-2xs"></i>
                                        {
                                        (typeof spot.avgRating === 'number') ? Number(spot.avgRating).toFixed(2) : <div className='noReviews'>no reviews</div>
                                    } </div>
                                    <br></br>
                                    <div className='priceLine'>
                                        <div className="price">${
                                            spot.price
                                        }</div>night</div>
                                </div>


                            </div>
                        </button>
                    </NavLink>
                ) : (
                    <div></div>
                )))
            } </div>
        </div>
    )

}


export default AllSpots
