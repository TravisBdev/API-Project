import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import SpotTile from "../SpotTile";
import { getAllSpots } from "../../store/spots";

import './SpotIndex.css'

const SpotIndex = () => {
  const dispatch = useDispatch()
  const spots = useSelector(state => Object.values(state.spots))

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (
    <div className="spot-index">
      {spots.map(spot => <SpotTile key={spot.id} spot={spot} />)}
    </div>
  )
}

export default SpotIndex
