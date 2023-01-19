// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots';
import SingleSpot from './components/SingleSpot'
import  EditSpot  from "./components/EditSpot";
import DeleteSpot from './components/DeleteSpot';
import CreateSpot from './components/CreateSpot';
import CreateReview from './components/CreateReview';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route  exact path='/' component={AllSpots}  />
          <Route exact path='/spots/create' component={CreateSpot} />
          <Route exact path='/spots/:spotId' component={SingleSpot} />
          <Route exact path='/spots/:spotId/edit' component={EditSpot} />
          <Route exact path='/spots/:spotId/delete' component={DeleteSpot} />
          <Route exact path ='/spots/:spotId/reviews' component={CreateReview} />
        </Switch>
      )}
    </>
  );
}

export default App;
