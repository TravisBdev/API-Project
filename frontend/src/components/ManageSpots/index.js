import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import ManageSpotTile from "../ManageSpotTile";
import { getUserSpots } from "../../store/spots";

const ManageSpots = () => {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.userSpots)

  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])

  return (
    <div>
      {spots?.map(spot => <ManageSpotTile key={spot.id} spot={spot} />)}
    </div>
  )
}

export default ManageSpots
