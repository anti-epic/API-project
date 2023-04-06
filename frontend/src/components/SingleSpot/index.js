import React from 'react';
import {Link, useParams, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {getSpot} from '../../store/spots';
import './SingleSpot.css';
import notFound from './not-found.png';
import { getReviews } from '../../store/reviews';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import DeleteReview from '../DeleteReview'
import CreateBookings from '../CreateBookings';
import { Box, Content, Media, Image, Level, Heading, Tag, Columns, Column, Button } from 'react-bulma-components';

const SingleSpot = () => {

const dispatch = useDispatch();
const {spotId} = useParams();
let sessionUser = useSelector(state => state.session.user);
const spotObj = useSelector(state => state.spots)
const reviewObj = useSelector(state=> state.reviews)

const spots = Object.values(spotObj)
const reviews = Object.values(reviewObj)

let alreadyReviewed = false;
let isLoggedIn = false

if(sessionUser){
 isLoggedIn = true
}



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

if(spotImages.length < 5){

for(let i = 0; i < 5; i++){
    if(!spotImages[i]){
        spotImages[i] = ('https://images.unsplash.com/photo-1628744876497-eb30460be9f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
    }
}
}


}

for(let i = 0; i < reviews.length; i++){
    if(reviews[i].User && reviews[i].User.id === sessionUser.id){
   alreadyReviewed = 'modalComponent';
    }

}



if(spotImages.length < 1){
    spotImages[0] = notFound
}
useEffect(() => {
    dispatch(getSpot(spotId))
    dispatch(getReviews(spotId))


},[spotId,reviews.length, alreadyReviewed, spotObj.name, spotObj.price, spotObj.city, spotObj.address, spotObj.state, spotObj.description, spotObj.country])
if(!spotObj){
    return null
}
if(!reviews){
    return null
}

const handleClick = (e) => {

  e.preventDefault()
}





return spotObj && reviews && (
    <div className='singleContainer'>
        <div>
       <h1 className='spotName'>{spotObj.name}</h1>
       <div className='spotData'>
      <i className="fa-solid fa-star fa-xs"></i> {(typeof (spotObj.avgStarRating) === 'number') ?  Number(spotObj.avgStarRating).toFixed(2) : 'no ratings'} | <p className='reviewsNumber'>{spotObj.numReviews} reviews</p>
       {spotObj.city}, {spotObj.state}
       </div>
        </div>

        {(sessionUser.id === spotObj.ownerId) ?
            (<div className='userUpdateDeleteSection'>
              <NavLink className='updateButton' to={`/spots/${spotId}/edit`}>Update Information</NavLink>
                <NavLink  className='deleteButton' to={`/spots/${spotId}/delete`}>Delete Location</NavLink>
                </div>
                ) :
                (
                    <div>
                    </div>

            )}

    <div className='imageLayout'>

<img  className='singleSpotImage item1'src={spotImages[0]}
onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=notFound;
  }}>

</img>
<img  className='singleSpotImage item2'src={spotImages[1]}
onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=notFound;
  }}></img>
<img  className='singleSpotImage item3'
// src={spotImages[2]}
src='https://images.unsplash.com/photo-1628745423010-bfb4df95f3eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=notFound;
  }}></img>
<img  className='singleSpotImage item4'
// src={spotImages[3]}
src='https://images.unsplash.com/photo-1628745277866-ff9305ac52cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=notFound;
  }}></img>
<img  className='singleSpotImage item5'
// src={spotImages[4]}
src='https://images.unsplash.com/photo-1628746041543-f27904c01cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=notFound;
  }}></img>




    </div>


    <div class="columns">
      <div class="column is-offset-one-fifth is-5">
      <div className='title'>{spotObj.name} hosted by {spotObj.Owner ? (spotObj.Owner.firstName) : ('Owner')}</div>
      </div>
      <div class="column is-2 ">
      <div className='reviews'>
      {(alreadyReviewed === false) && (sessionUser.id !== undefined) ? (
        <NavLink to={`/spots/${spotId}/reviews`} className='button is-danger is-normal'>Create a review</NavLink>
        ) : (
          <div className='button is-danger is-normal'disabled>
          {isLoggedIn ? (
            <OpenModalMenuItem itemText="Create a review" />
            ) : (
              <OpenModalMenuItem itemText="Create a review" modalComponent={<LoginFormModal />} />
              )}
        </div>
      )}
      </div>
    </div>
</div>



    <div className='columns'>
  <div className='column is-half is-offset-one-fifth'>
    <div className='subtitle'>{ Math.floor(Math.random() * (10 - 4) + 4)} guests |   { Math.floor(Math.random() * (10 - 2) + 2)} bedrooms |   { Math.floor(Math.random() * (10 - 4) + 4)} beds |   { Math.floor(Math.random() * (4 - 2) + 2)} bath</div>
    <div className='price-reviews-line '>
      <div className='single-price'>${spotObj.price} Night   <i className="fa-solid fa-star fa-xs"></i>  {(typeof (spotObj.avgStarRating) === 'number') ?  Number(spotObj.avgStarRating).toFixed(2) : 'new'} |
       { spotObj.numReviews} reviews
      </div>
      </div>
    <br></br>

    <div class="columns is-mobile">
      <div class="column is-11">
        <p>{spotObj.description}</p>
      </div>
      <div class="column">
        {(sessionUser.id !== undefined) ? (

          <p><CreateBookings /></p>
        )
      :(<div></div>)}
      </div>
    </div>



 <Box>
      <Content>
        <Heading size={4}>Reviews</Heading>
        {reviews.map((review) => (
          <Media key={review.id}>
            <Media.Item renderAs="figure"  >
              <i className="fa-solid fa-user  fa-xl"></i>
            </Media.Item>
            <Media.Item>
              <Level>
                <Level.Side align="left">
                  <Level.Item>
                    <Heading size={6}>{review.User ? review.User.firstName : 'User'}</Heading>
                    <Tag size={6}>{new Date(review.createdAt).toLocaleDateString()}</Tag>
                  </Level.Item>
                </Level.Side>
                {sessionUser.id === review.userId &&
                  <Level.Side align="right">
                    <Level.Item className="button is-danger" >
                    <OpenModalMenuItem itemText="Delete Review" modalComponent={<DeleteReview reviewId={review.id} />} />
                    </Level.Item>
                  </Level.Side>
                }
              </Level>
              <Content style={{ overflow: 'auto', maxWidth: '50em' }}>
                {review.review}
              </Content>
            </Media.Item>
          </Media>
        ))}
      </Content>
    </Box>




  </div>
</div>






    </div>

)

}



export default SingleSpot
