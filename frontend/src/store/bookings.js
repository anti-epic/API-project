import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/LOAD'
const CREATE_BOOKING = 'booking/CREATE'

const loadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const createBookingThunk = (spotId, payload) => async dispatch => {


       const response = await csrfFetch(`/api/bookings/${spotId}`, {
           method: 'POST',
           headers: {"Content-Type" : "application/json"},
           body: JSON.stringify(payload)
        })
        if(response.ok){
            const data = await response.json();
            dispatch(createBooking(data));
        }
    }




export const handleFetchError = (response) => {
    if (!response.ok) {
      if (response.status === 403) {
        console.log('error');
      }
      throw Error(response.statusText);
    }
    return response;
  };




export const getAllBookingsThunk = () => async dispatch => {
    // console.log(id, 'by payload');
    const response = await csrfFetch(`/api/bookings/current`)
    if(response.ok) {

        const spot = await response.json();
        dispatch(loadBookings(spot))
    }
}


const initialState = {
personalBookings:[],
spotBookings:[]
}

const bookingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_BOOKINGS:
            const newState={...state}
            action.bookings.Bookings.forEach(booking => {
                if(booking.id !== undefined){
                    newState.personalBookings[booking.id] = booking
                }

            })
            return newState
        case CREATE_BOOKING:
            const addBookingState ={}

            return addBookingState
        default:
            return state
    }
}


export default bookingReducer
