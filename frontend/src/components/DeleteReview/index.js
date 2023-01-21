
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteReviewThunk } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import './deleteReview.css';

const DeleteReview = ({}) => {
    const history = useHistory();
    const dispatch = useDispatch();
   const {reviewId} =  useParams();
    const spotObj = useSelector(state => state.spots);






if(!spotObj){
    return null
}

const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId));

    history.push(`/spots/${spotObj.id}`);
}

    return(

    <div className='deleteContainer'>


        <form className='deleteForm' onSubmit={handleSubmit}>
       <h1 className='deleteHeader'> Are you sure you want to delete this review? </h1>
        <input className='deleteReviewButtonConfirm'type='submit' value="DELETE" />
        </form>



    </div>




    );
}



export default DeleteReview
