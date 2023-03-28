import {useParams,  useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
// import './CreateBookings.css'
import { deleteBookingThunk, getAllUserBookingsThunk} from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
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
    console.log(bookId, 'yoooo delete')


dispatch(deleteBookingThunk(bookId)).then((res) =>  closeModal()).then((data) => history.push('/bookings')).catch(async (res) => {
    const data = await res.json();
    console.log('bad')
        setErrors(data.message);
})

 setErrors('')

}



return isLoaded && (
    <><div>
     <ul className="createBooking-errors">

                        <div className='errorsContainer'>{errors}</div>

                </ul>

        <form className='createForm' onSubmit={handleBooking}>
    are you sure you wanna delete the booking?
<input className='submitBookingInfo' type='submit'
value='DELETE'></input>
        </form>

        </div></>
)

}
