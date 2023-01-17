import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {getSpot} from '../../store/spots';
import './SingleSpot.css';
import notFound from './not-found.png'

const SingleSpot = () => {

const dispatch = useDispatch();
const {spotId} = useParams();


const spotObj = useSelector(state => state.spots)

let spotImagesFilter
let spotImages = [];
if(spotObj.SpotImages){

  spotImagesFilter = Object.values(spotObj.SpotImages)

  spotImagesFilter.forEach((image) => {
    console.log(image, 'image')
    if(image.url){
        spotImages.push(image.url)
    }
})
}



console.log(spotImages, 'hereee')
if(spotImages.length < 1){
    spotImages[0] = notFound
}
useEffect(() => {
    dispatch(getSpot(spotId))




},[spotId])
if(!spotObj){
    console.log('nothing')
    return null
}


return(
    <div className='singleContainer'>
        <div>
       <h1>{spotObj.name}</h1>
      <i className="fa-solid fa-star fa-2xs"></i> {Number(spotObj.avgStarRating).toFixed(2)} | <Link className="reviewsLink">{spotObj.numReviews} reviews </Link>
       {spotObj.city}, {spotObj.state}
        </div>

       <img className='singleSpotImage'src={spotImages[0]}></img>
    </div>
)

}



export default SingleSpot
