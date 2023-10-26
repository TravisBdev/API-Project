import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ManageSpotTile from "../ManageSpotTile";
import { getUserSpots } from "../../store/spots";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './ManageSpots.css'

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
        <button className="create-btn"><Link className='btn-link' to={'/spots'}>Create a New Spot</Link></button>
      </div>
      <div className="spots-list">{spots?.map(spot => <ManageSpotTile key={spot.id} spot={spot} />)}</div>
    </div>
  )
}

export default ManageSpots
