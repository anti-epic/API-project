import { csrfFetch } from "./csrf";



const LOAD_SPOTS = '/spots/LOAD';
const LOAD_SPOT = '/spot/LOAD'

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




const initialState = {
  };


const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
            console.log('in reducer')
            const newState = {...state}
            const allSpots = {}

            // console.log(action.spots, 'next');
            action.spots.spots.forEach(spot => {
                newState[spot.id] = spot
            })
            // console.log('newState', newState)
            return {...newState}
        case LOAD_SPOT:
            console.log('in single spot reducer')
            const newSpotState = {...action.spot};
            // console.log(newSpotState, 'jere',action.spot)
            console.log(action.spot, 'ss', newSpotState)
            return newSpotState
        default:
            return state
    }

}


export default spotReducer;
