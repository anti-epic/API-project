import { csrfFetch } from "./csrf";



const LOAD_SPOTS = '/spots/LOAD';
const LOAD_SPOT = '/spot/LOAD';
const EDIT_SPOT = '/spot/edit';
const DELETE_SPOT = '/spot/DELETE';
const ADD_SPOT = '/spot/ADD';
const ADD_IMAGE = '/spot/image/ADD';

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    // console.log('in')
    if (response.ok) {
        const spots = await response.json();
        // console.log(spots, 'here')
        dispatch(loadSpots(spots));
      }

};

export const getSpot = (id) => async dispatch => {
    // console.log(id, 'by payload');
    const response = await csrfFetch(`/api/spots/${id}`)
    if(response.ok) {

        const spot = await response.json();
        dispatch(loadSpot(spot))
    }
}

export const editSpotThunk = (payload, id) => async dispatch => {
    // console.log(id, ' in edit')
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(editSpot(data))
    }

}



export const deleteSpotThunk = (id) => async dispatch => {
    // console.log(id, ' in delete')
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
    })
    if(response.ok){

        const data = await response.json();
        dispatch(deleteSpot(data))
    }

}







export const createSpotThunk = (payload, url) => async dispatch => {
    // console.log(payload, ' in add spot thunk')
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(createSpot(data))
       console.log('testing double thunking', data)

        const secondResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(url)
        })
        if(secondResponse.ok){
            const secondData = await secondResponse.json();
            dispatch(addImage(secondData))

        }
    }



}




export const createImageForSpotThunk= (payload, id) => async dispatch => {
    console.log(payload, id, ' in add image spot thunk')
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(addImage(data))
    }

}





const addImage = (image) => {
    console.log(image, 'in image not thunk');
    return {
        type: ADD_IMAGE,
        image
    }
}



const deleteSpot = (spot) => {
    return{
        type: DELETE_SPOT,
        spot
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

const createSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}



const initialState = {
  };


const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
            // console.log('in reducer')
            const newState = {}

            // console.log(action.spots, 'next');
            action.spots.spots.forEach(spot => {
                newState[spot.id] = spot
            })
            // console.log('newState', newState)
            return {...newState}
        case LOAD_SPOT:
            // console.log('in single spot reducer')
            const newSpotState = {...action.spot};
            // console.log(newSpotState, 'jere',action.spot)
            // console.log(action.spot, 'ss', newSpotState)
            return newSpotState
        case EDIT_SPOT:
            // console.log('edit spot before', state)
            const editState = {...state};
            editState[action.spot.id] = action.spot;
            // console.log('edit spot after', editState)
            return editState
        case DELETE_SPOT:
            // console.log('in delete state');
            const deleteState = {...state}
            delete deleteState.spots[action.spotId]

            return deleteState
        case ADD_SPOT:
            const addSpotState = {...state};
            addSpotState[action.spot.id] = action.spot;
            return addSpotState
        case ADD_IMAGE:
            const addImageState = {...state}
            addImageState[action.image.spotId] = action.image
        default:
            return state
    }

}


export default spotReducer;
