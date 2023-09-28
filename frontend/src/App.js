import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/" component={SpotIndex} />
        <Route exact path='/spots' component={CreateSpot} />
        <Route exact path='/spots/current' component={ManageSpots} />
        <Route exact path='/spots/:spotId' component={SpotDetails} />
        <Route exact path='/spots/:spotId/edit' component={UpdateSpot} />
      </Switch>}
    </>
  );
}

export default App;
