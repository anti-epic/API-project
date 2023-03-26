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
    console.log(' in thunk to create', spotId, payload, ' there' , JSON.stringify(payload))
    const response = await csrfFetch(`/api/bookings/${spotId}`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
       console.log(data, 'good')
       dispatch(createBooking(data))
    }
    // else {

    //     const data = await response.json();
    //     console.log(data, 'bad')
    // }

}

export const getAllBookingsThunk = () => async dispatch => {
    // console.log(id, 'by payload');
    const response = await csrfFetch(`/api/bookings/current`)
    if(response.ok) {

        const spot = await response.json();
        dispatch(loadBookings(spot))
    }
}


const initialState = {

}

const bookingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_BOOKINGS:
            const newState={}
            console.log(action, ' in load bookings')
            return newState
        case CREATE_BOOKING:
            const addBookingState ={}
            console.log(action, ' in create booking')
            return addBookingState
        default:
            return state
    }
}


export default bookingReducer
