import React from 'react';
import {Link, useParams, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import {getSpot} from '../../store/spots';
import './SingleSpot.css';
import notFound from './not-found.png'
import { getReviews } from '../../store/reviews';

const SingleSpot = () => {

const dispatch = useDispatch();
const {spotId} = useParams();
let sessionUser = useSelector(state => state.session.user);

const spotObj = useSelector(state => state.spots)
const reviewObj = useSelector(state=> state.reviews)

const reviews = Object.values(reviewObj)

const reviewLength = reviews.length;
// console.log(reviewLength, 'review length')

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




if(spotImages.length < 1){
    spotImages[0] = notFound
}
useEffect(() => {
    dispatch(getSpot(spotId))
    dispatch(getReviews(spotId))



},[spotId,reviews.length])
if(!spotObj){
    return null
}
if(!reviews){
    return null
}


// console.log(sessionUser.id, 'here with sessionid')
return(
    <div className='singleContainer'>
        <div>
       <h1 className='spotName'>{spotObj.name}</h1>
       <div className='spotData'>
      <i className="fa-solid fa-star fa-xs"></i> {(typeof (spotObj.avgStarRating) === 'number') ?  Number(spotObj.avgStarRating).toFixed(2) : 'no ratings'} | <p className='reviewsNumber'>{spotObj.numReviews} reviews</p>
       {spotObj.city}, {spotObj.state}
       </div>
        </div>

        {(sessionUser.id === spotObj[spotId].ownerId) ?
            (<div className='userUpdateDeleteSection'>
              <NavLink className='updateButton' to={`/spots/${spotId}/edit`}>Update</NavLink>
                <NavLink  className='deleteButton' to={`/spots/${spotId}/delete`}>Delete</NavLink>
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
        <div className='spotDescription'>{spotObj.description}</div>
        {(sessionUser.id !== undefined) ? (
    <div className='reviewsContainer'>
        <div className='createReviewContainer'>
            <div className='singlePrice'>${spotObj.price} Night</div>
        <NavLink to={`/spots/${spotId}/reviews`} className='addReviewText'>Create a review</NavLink>
        </div>

        <div className='reviews'>
        {reviews.map((review) => (
            review ?(
            <div className='individualReview'>
                 <div className='userNameReview'>  <i class="fa-solid fa-user  fa-xl"> </i>
                 {review.User ? (review.User.firstName) : ('user')}
                 </div>
           <div className='descriptionReview'>  {review.review} </div>

            </div>) : <div></div>
        ))}
        </div>
    </div>)
    : (  <div className='reviewsContainerLoggedOut'>

        <div className='singlePriceLoggedOut'>${spotObj.price} Night</div>

    <div className='reviewsLoggedOut'>
    {reviews.map((review) => (
         review ?(
        <div className='individualReview'>
             <div className='userNameReview'>  <i class="fa-solid fa-user  fa-xl"> </i> {review.User.firstName}</div>
       <div className='descriptionReview'>  {review.review} </div>

        </div>) : (<div></div>)
    ))}
    </div>
</div>)}
</div>
)

}



export default SingleSpot
