import {csrfFetch} from "./csrf";

const LOAD_BOOKINGS = 'bookings/LOAD'
const CREATE_BOOKING = 'booking/CREATE'
const EDIT_BOOKING = 'booking/EDIT'
const DELETE_BOOKING = 'booking/DELETE'
const loadBookings = (bookings) => {
    return {type: LOAD_BOOKINGS, bookings}
}

const createBooking = (booking) => {
    return {type: CREATE_BOOKING, booking}
}


const editBooking = (booking) => {
    return{type: EDIT_BOOKING, booking}
}
const deleteBooking = (booking) => {
    return{type: DELETE_BOOKING, booking}
}

export const deleteBookingThunk = (id) => async dispatch => {
    console.log(id, ' in delete booking')
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){

        const data = await response.json();
        dispatch(deleteBooking(data))
    }

}


export const editBookingThunk = (spotId, payload) => async dispatch => {
    console.log(payload, ' payload')
    const response = await csrfFetch(`api/bookings/${spotId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        console.log('herererere in good')
        const data = await response.json();
        dispatch(editBooking(data));
    }
}



export const createBookingThunk = (spotId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${spotId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createBooking(data));
    }
}




export const getAllUserBookingsThunk = () => async dispatch => { // console.log(id, 'by payload');
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {

        const spot = await response.json();
        dispatch(loadBookings(spot))
    }
}


const initialState = {
    personalBookings: {},
    spotBookings: {}
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS: const newState = {
                personalBookings: {},
                spotBookings: {}
            }
            action.bookings.Bookings.forEach(booking => {
                if (booking.id !== undefined) {
                    newState.personalBookings[booking.id] = booking
                }

            })
            return newState
        case CREATE_BOOKING: const addBookingState = {}
            return addBookingState
        case EDIT_BOOKING:
            const editState = {...state};
            editState.personalBookings[action.booking.id] = action.booking
            return editState
        case DELETE_BOOKING:
            const deleteBookingState = {}
            return deleteBookingState
        default:
            return state
    }
}


export default bookingReducer
