
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import './createReview.css'

const CreateReview = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);




const handleSubmit = async (e) => {
    e.preventDefault();




    const payload = {
    review,
    stars
    }
    dispatch(createReviewThunk(payload, spotId));
 history.push(`/spots/${spotId}`);

}

    return(

    <div className='editContainer'>
        <div className='formTitle'> Create A Review</div>

        <form className='createForm' onSubmit={handleSubmit}>
        <input
          type="textarea"
          placeholder='Review'
          required
          value={review}
          onChange={(e) => setReview(e.target.value)}
          />
      <input
          type="number"
          placeholder='stars'
          min='1'
          max='5'
          required
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          />

        <input className='submitCreateInfo' type='submit' value='Create Review'></input>

        </form>



    </div>




    );
}



export default CreateReview
