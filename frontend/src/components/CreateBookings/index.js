import {useParams,  useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CreateBookings.css'
import { createBookingThunk, getAllUserBookingsThunk} from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
export default function CreateBookings() {
const dispatch = useDispatch()
const [ errors, setErrors ] = useState([]);
const [isLoaded, setIsLoaded] = useState(false)
const {spotId} = useParams()
const history = useHistory();
const [value, onChange] = useState(new Date());

const bookingsObj = useSelector((state) => state.bookings.personalBookings);
let bookings = []

if(bookingsObj){
    bookings = Object.keys(bookingsObj)
}
// const tileDisabled = ({ bookings }) => {
//   // Disable the tile if the date already has a booking
//   bookings.forEach((booking) => booking.startDate.toDateString() === booking.startDate.toDateString() && booking.endDate.toDateString() === booking.endDate.toDateString() )
// };

useEffect(() => {
    dispatch(getAllUserBookingsThunk())
    // .then(() => {
    //     bookings.forEach((booking) => {
    //         if(booking){
    //             console.log(' in')
    //             booking.startDate = new Date(booking.startDate);
    //             booking.endDate = new Date(booking.endDate);
    //             console.log(booking.startDate, booking.endDate)
    //         }
    //       })
    // })
    .then(() => {
        setIsLoaded(true);
    });
  }, [dispatch, bookings.length]);


const handleBooking = async (e) => {
    e.preventDefault();

    var startDateObj = new Date(value[0]);
    let smonth = startDateObj.getUTCMonth() + 1;
    let sday = startDateObj.getUTCDate();
    let syear = startDateObj.getUTCFullYear();

    var endDateObj = new Date(value[1]);
    let dmonth = endDateObj.getUTCMonth() + 1;
    let dday = endDateObj.getUTCDate() -1;
    let dyear = endDateObj.getUTCFullYear();

   let startDate = syear + "-" + smonth + "-" + sday;
   let endDate = dyear + "-" + dmonth + "-" + dday;
const payload = {
    startDate,endDate
}



dispatch(createBookingThunk(spotId,payload)).then((res) =>  history.push(`/bookings`)).catch(async (res) => {
    const data = await res.json();
        setErrors(data.message);
})

 setErrors('')

}



return isLoaded && (
    <>
     <ul className="createBooking-errors">

                        <div className='errorsContainer'>{errors}</div>

                </ul>

        <form className='createForm' onSubmit={handleBooking}>
<Calendar goToRangeStartOnSelect={false} selectRange={true}onChange={onChange} value={value}
// tileDisabled={tileDisabled}
/>
<input className='submitBookingInfo' type='submit' value='Book'></input>

        </form>

       </>
)

}
