import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviews } from "../../store/reviews";

import ReviewTile from "../ReviewTile";

const ReviewList = ({ spotId }) => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => Object.values(state.reviews))

  useEffect(() => {
    dispatch(getAllReviews(spotId))
  }, [dispatch, spotId])

  return (
    <div className="review-tiles">
      {reviews?.map(review => <ReviewTile key={review.id} review={review} />)}
    </div>
  )
}

export default ReviewList
