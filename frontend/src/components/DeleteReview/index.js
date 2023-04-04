
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteReviewThunk } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import './deleteReview.css';
import { useModal } from "../../context/Modal";
import { Modal, Box, Button, Heading } from 'react-bulma-components';

const DeleteReview = ({reviewId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);


    const { closeModal } = useModal();



if(!spotObj){
    return null
}

const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId));
    closeModal();
    history.push(`/spots/${spotObj.id}`);
}

    return(

    // <div className='deleteContainer'>


    //     <form className='deleteForm' onSubmit={handleSubmit}>
    //    <h1 className='deleteHeader'> Delete this review? </h1>
    //     <input className='deleteReviewButtonConfirm'type='submit' value="DELETE" />
    //     </form>



    // </div>


<div className='deleteContainer'>
  <form className='deleteForm' onSubmit={handleSubmit}>
    <h1 className='deleteHeader title is-4'>Delete this review?</h1>
    <button className='button is-danger' type='submit'>DELETE</button>
  </form>
</div>

    );
}



export default DeleteReview
