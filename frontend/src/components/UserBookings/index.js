import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getAllUserBookingsThunk} from '../../store/bookings';
import EditBooking from '../EditBooking';
import './UserBookings.css'

import notFound from './not-found.png';
import OpenModalButton from "../OpenModalButton";
import DeleteBooking from '../DeleteBooking';
const  UserBookings = () => {
    const [value, onChange] = useState(new Date());
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.toLocaleString('en-US', { weekday: 'long' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${day}, ${month} ${date.getDate()}, ${year}`;
      }









    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const bookingsObj = useSelector((state) => state.bookings.personalBookings);
    let bookings = []

    if (bookingsObj) {
        bookings = Object.values(bookingsObj)
    }
    useEffect(() => {
        dispatch((getAllUserBookingsThunk())).then((data) => setIsLoaded(true))
    }, [dispatch, bookings.length])




    return isLoaded && (<div>
         <div className='booking-container'>
            <h1>Your Bookings</h1>
      {bookings.map((booking) => booking ? (


        <div className="booking-card">
            {booking.Spot ? ( <div className="image-container" style={{ backgroundImage: `url(${booking.Spot.previewImage})`, backgroundSize: 'cover' }}></div>) : (<div className="image-container" style={{ backgroundImage: `url(${notFound})`, backgroundSize: 'cover' }}></div>)}
        <div className="booking-card__dates">
          <div className="booking-card__date">
            <div className="booking-card-date">Check-in Date: {formatDate(booking.startDate)}</div>
          </div>
          <div className="booking-card__date">
            <div className="booking-card-date">Check-out Date: {formatDate(booking.endDate)}</div>
          </div>
          {/* <div className='booking-house-name'>Location:{booking.Spot.name} | {booking.Spot.city} {booking.Spot.state}</div> */}
        </div>
        <div className="booking-card__buttons">
          <button    className="booking-card__button booking-card__button--delete">
          <OpenModalButton
				buttonText={'DELETE'}
				modalComponent={<DeleteBooking  bookId={booking.id}/>}
			/>
          </button>
          <button  className="booking-card__button booking-card__button--edit">
          <OpenModalButton
				buttonText={'EDIT'}
				modalComponent={<EditBooking  bookId={booking.id}/>}
			/>
          </button>
        </div>
      </div>











        // <div key={booking.id}>{booking.startDate} | {booking.endDate} </div>
      ) : (<div> no</div>))}
    </div>

{/*
{numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )} */}

        </div>)
}



export default UserBookings
