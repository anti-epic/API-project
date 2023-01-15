import { csrfFetch } from "./csrf";



const LOAD_SPOTS = '/spots/LOAD';


export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    console.log('in')
    if (response.ok) {
        const spots = await response.json();
        console.log(spots, 'here')
        dispatch(loadSpots(spots));
      }

};


const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
     spots
    };
};

const initialState = {
  };


const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
            console.log('in reducer')
            const newState = {...state}
            // const allSpots =  {};
            // console.log(action.list)
            // action.list.forEach(spot => {
            //     allSpots[spot.id] = spot;
            //   });
            const allSpots = {}

            console.log(action.spots, 'next');
            action.spots.spots.forEach(spot => {
                newState[spot.id] = spot
            })
            console.log('newState', newState)
            return {...newState}
        default:
            return state
    }

}


export default spotReducer;
