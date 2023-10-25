import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ManageSpotTile from "../ManageSpotTile";
import { getUserSpots } from "../../store/spots";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ManageSpots = () => {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.userSpots)
  // console.log(spots);

  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])

  return (
    <div>
      <div>
        <h1>Manage Spots</h1>
        <button><Link to={'/spots'}>Create a New Spot</Link></button>
      </div>
      {spots?.map(spot => <ManageSpotTile key={spot.id} spot={spot} />)}
    </div>
  )
}

export default ManageSpots
