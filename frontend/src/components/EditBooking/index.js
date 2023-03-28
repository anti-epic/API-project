import {useParams,  useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useModal } from "../../context/Modal";
import { editBookingThunk, getAllUserBookingsThunk} from '../../store/bookings';
import { useDispatch, useSelector } from 'react-redux';
export default function EditBooking({bookId}) {
const { closeModal } = useModal();
const dispatch = useDispatch()
const [ errors, setErrors ] = useState([]);
const [isLoaded, setIsLoaded] = useState(false)
const history = useHistory();
const [value, onChange] = useState(new Date());

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


dispatch(editBookingThunk(bookId,payload)).then((res) =>  history.push(`/bookings`)).then((res) =>  closeModal()).catch(async (res) => {
    const data = await res.json();
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
<Calendar goToRangeStartOnSelect={false} selectRange={true}onChange={onChange} value={value}/>
<input className='submitBookingInfo' type='submit' value='Book'></input>

        </form>

        </div></>
)

}
