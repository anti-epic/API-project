import { csrfFetch } from "./csrf";



const LOAD_SPOTS = '/spots/LOAD';
const LOAD_SPOT = '/spot/LOAD'
const EDIT_SPOT = '/spots/:spotId/edit'
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    console.log('in')
    if (response.ok) {
        const spots = await response.json();
        console.log(spots, 'here')
        dispatch(loadSpots(spots));
      }

};

export const getSpot = (id) => async dispatch => {
    console.log(id, 'by payload');
    const response = await csrfFetch(`/api/spots/${id}`)
    if(response.ok) {

        const spot = await response.json();
        dispatch(loadSpot(spot))
    }
}

export const editSpotThunk = (payload, id) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {"CONTENT-TYPE" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(editSpot(payload))
    }

}


const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
     spots
    };
};

const loadSpot= (spot) => {
    return {
        type: LOAD_SPOT,
        spot
    }
}

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}




const initialState = {
  };


const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
            console.log('in reducer')
            const newState = {}

            // console.log(action.spots, 'next');
            action.spots.spots.forEach(spot => {
                newState[spot.id] = spot
            })
            // console.log('newState', newState)
            return {...newState}
        case LOAD_SPOT:
            console.log('in single spot reducer')
            const newSpotState = {...state,...action.spot};
            // console.log(newSpotState, 'jere',action.spot)
            console.log(action.spot, 'ss', newSpotState)
            return newSpotState
        case EDIT_SPOT:
            console.log('edit spot before', state)
            const editState = {...state};
            editState[action.spot.id] = action.spot;
            console.log('edit spot after', editState)
            return editState
        default:
            return state
    }

}


export default spotReducer;
