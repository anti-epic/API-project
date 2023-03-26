import {useParams,  useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createBookingThunk, getAllBookingsThunk } from '../../store/bookings';
import { useDispatch } from 'react-redux';
export default function CreateBookings() {
const dispatch = useDispatch()
const {spotId} = useParams()
const history = useHistory();
const [value, onChange] = useState(new Date());
const handleBooking = async (e) => {
    e.preventDefault();
    console.log(  'start',
  value,
    'end', spotId)

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
    console.log(startDate, ' ',endDate, ' ', value)
const payload = {
    startDate,endDate
}
dispatch(createBookingThunk(spotId,payload))
dispatch(getAllBookingsThunk(spotId))



 history.push(`/spots/${spotId}`);








}





return (
    <><div>
        <form className='createForm' onSubmit={handleBooking}>
<Calendar goToRangeStartOnSelect={false} selectRange={true}onChange={onChange} value={value} />
<input className='submitCreateInfo' type='submit' value='Book'></input>

        </form>

        </div></>
)


}
