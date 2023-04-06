import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getAllUserBookingsThunk} from '../../store/bookings';
import EditBooking from '../EditBooking';
import './UserBookings.css'
import 'bulma/css/bulma.min.css';
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




    return isLoaded && (



<div className='booking-container'>
  <h1 className='title'>Your Bookings</h1>
  <div className='columns is-multiline is-mobile is-centered'>
    {bookings.map((booking) => booking ? (
      <div key={booking.id} className='column is-one-fifth'>
        <div className="card">
          {booking.Spot ? (
            <div className="card-image" style={{ backgroundImage: `url(${booking.Spot.previewImage})`, backgroundSize: 'cover' }}>
              <figure className="image is-4by3"></figure>
            </div>
          ) : (
            <div className="card-image" style={{ backgroundImage: `url(${notFound})`, backgroundSize: 'cover' }}>
              <figure className="image is-4by3"></figure>
            </div>
          )}
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{booking.Spot ? booking.Spot.name : 'Unknown Location'}</p>
                <p className="subtitle is-6">{booking.Spot ? `${booking.Spot.city}, ${booking.Spot.state}` : ''}</p>
              </div>
            </div>
            <div className="content ">
              <p>Check-in Date: {formatDate(booking.startDate)}</p>
              <p>Check-out Date: {formatDate(booking.endDate)}</p>
              <div className="buttons">
                <div className="button is-warning is-light booking-edit">
       <OpenModalButton
		buttonText={'EDIT'}
		modalComponent={<EditBooking  bookId={booking.id}/>} />
                 </div>
                 <div className="button is-danger is-light booking-delete" style={{cursor: "default"}}>
       <OpenModalButton
		buttonText={'DELETE'}
		modalComponent={<DeleteBooking  bookId={booking.id}/>} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null)}
  </div>
</div>




    )

}



export default UserBookings
