import {useParams,  useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import { deleteBookingThunk, getAllUserBookingsThunk} from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
import './deleteBooking.css';
import 'bulma/css/bulma.min.css';
export default function DeleteBooking({bookId}) {
    const dispatch = useDispatch()
    const [ errors, setErrors ] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
const history = useHistory();
const [value, onChange] = useState(new Date());

const { closeModal } = useModal();
const bookingsObj = useSelector((state) => state.bookings.personalBookings);
let bookings = []

if(bookingsObj){
    bookings = Object.keys(bookingsObj)
}


useEffect(() => {
    dispatch(getAllUserBookingsThunk())

    .then(() => {
        setIsLoaded(true);
    });
  }, [dispatch, bookings.length]);


const handleBooking = async (e) => {
    e.preventDefault();



dispatch(deleteBookingThunk(bookId)).then((res) =>  closeModal()).then((data) => history.push('/bookings')).catch(async (res) => {
    const data = await res.json();
        setErrors(data.message);
})

 setErrors('')

}



return isLoaded && (
    <>
<div className="deleteBookingContainer">
  <ul className="createBooking-errors">
    <div className="errorsContainer">{errors}</div>
  </ul>

  <form className="createForm" onSubmit={handleBooking}>
    <div className="deleteText">Are you sure you want to delete the booking?</div>
    <input className="submitBookingInfo button is-danger" type="submit" value="DELETE" />
  </form>
</div>
        </>
)

}
