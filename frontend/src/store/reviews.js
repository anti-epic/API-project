import { csrfFetch } from "./csrf";



const LOAD_REVIEWS = '/reviews/LOAD';
const ADD_REVIEW = '/review/ADD';

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
     reviews
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
}


export const createReviewThunk = (payload, id) => async dispatch => {
    console.log(payload, id, ' in create review thunk')
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){

        const data = await response.json();
        dispatch(addReview(data))
    }

}






export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if (response.ok) {
        const reviews = await response.json();

        dispatch(loadReviews(reviews));
      }
      console.log('im down here')
    //  const responseUser = await csrfFetch(``)

};






const initialState = {
}



const reviewReducer = (state = initialState, action) => {
        switch(action.type){
            case LOAD_REVIEWS:
                const newState={}
                console.log(action, 'in action review reducer')
                if(action.reviews.Reviews){
                    action.reviews.Reviews.forEach(review => {
                        newState[review.id] = review
                    })
                }
            return newState
            case ADD_REVIEW:
                const addReviewState = {...state};
                addReviewState[action.review.id] = action.review;
                return addReviewState
            default:
                return state

        }



}


export default reviewReducer