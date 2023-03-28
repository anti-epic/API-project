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
        spotImages[i] = ('https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg');
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

<img  className='singleSpotImage item1'src={spotImages[0]}></img>
<img  className='singleSpotImage item2'src={spotImages[1]}></img>
<img  className='singleSpotImage item3'src={spotImages[2]}></img>
<img  className='singleSpotImage item4'src={spotImages[3]}></img>
<img  className='singleSpotImage item5'src={spotImages[4]}></img>




    </div>

    <div className='reviewsContainer'>
    <div className='spotDescription'>
       <h3> {spotObj.name} hosted by {spotObj.Owner ? (spotObj.Owner.firstName) : ('Owner')}</h3>
      <div className='info'>  { Math.floor(Math.random() * (10 - 4) + 4)} guests |   { Math.floor(Math.random() * (10 - 2) + 2)} bedrooms |   { Math.floor(Math.random() * (10 - 4) + 4)} beds |   { Math.floor(Math.random() * (4 - 2) + 2)} bath </div>
        <br></br>
        {spotObj.description}</div>

        <div className='createReviewContainer'>
          <div className='priceReviewsLine'>  <div className='singlePrice'>${spotObj.price} Night</div> <div className='reviewsRatingBottom'>  <i className="fa-solid fa-star fa-xs"></i> {(typeof (spotObj.avgStarRating) === 'number') ?  Number(spotObj.avgStarRating).toFixed(2) : 'new'}</div>{spotObj.numReviews} reviews</div>
          <div className='calanderContainer'><CreateBookings /></div>


        </div>

        <div className='reviews'>
          {(alreadyReviewed === false) && (sessionUser.id !== undefined)  ?(

<NavLink to={`/spots/${spotId}/reviews`} className='addReviewText'>Create a review</NavLink>
)
:

(

    <div className='disabledCreateReview'>
        {isLoggedIn ? (
            <OpenModalMenuItem  itemText="Create a review" />
        ) : (
<OpenModalMenuItem  itemText="Create a review" modalComponent={<LoginFormModal />} />
        )}


   </div>
    )
     }
        {reviews.map((review) => (

            <div  key={review.id} className='individualReview'>
                 <div className='userNameReview'>  <i class="fa-solid fa-user  fa-xl"> </i>

                 {review.User ? (review.User.firstName) : ('user')}
                 </div>
           <div className='descriptionReview'>  {review.review} </div>
           {sessionUser.id === review.userId ? (
            <div className='deleteReviewButton'>
                <OpenModalMenuItem  itemText="Delete Review"  modalComponent={<DeleteReview reviewId={review.id} />}>

                </OpenModalMenuItem>
                </div>

           ) : <div></div>}
            </div>
        ))}
        </div>
    </div>
</div>

)

}



export default SingleSpot
