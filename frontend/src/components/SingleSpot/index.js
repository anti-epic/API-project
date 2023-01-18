import React from 'react';
import {Link, useParams, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {getSpot} from '../../store/spots';
import './SingleSpot.css';
import notFound from './not-found.png'

const SingleSpot = () => {

const dispatch = useDispatch();
const {spotId} = useParams();
let sessionUser = useSelector(state => state.session.user);

const spotObj = useSelector(state => state.spots)

if(!sessionUser) sessionUser = 'not logged in';

let spotImagesFilter
let spotImages = [];
if(spotObj.SpotImages){

  spotImagesFilter = Object.values(spotObj.SpotImages)

  spotImagesFilter.forEach((image) => {
    if(image.url){
        spotImages.push(image.url)
    }
})
}


if(spotImages.length < 1){
    spotImages[0] = notFound
}
useEffect(() => {
    dispatch(getSpot(spotId))





},[spotId])
if(!spotObj){
    return null
}


return(
    <div className='singleContainer'>
        <div>
       <h1>{spotObj.name}</h1>
      <i className="fa-solid fa-star fa-2xs"></i> {Number(spotObj.avgStarRating).toFixed(2)} | <Link className="reviewsLink">{spotObj.numReviews} reviews </Link>
       {spotObj.city}, {spotObj.state}
        </div>
    <div className='imageLayout'>

        {spotImages.map((image) => (

            <img key={image.id} className='singleSpotImage'src={image}></img>

            ))}
            </div>
            {(sessionUser.id === spotObj[spotId].ownerId) ?
            (<div>
                <div className='updateButton'><NavLink to={`/spots/${spotId}/edit`}>Update</NavLink></div>
                <div className='deleteButton'><NavLink to={`/spots/${spotId}/delete`}>Delete</NavLink></div>
                </div>
                ) :
                (
                    <div>
                        {spotObj.description}
                    </div>

            )}
    </div>
)

}



export default SingleSpot
