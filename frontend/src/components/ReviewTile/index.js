import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';

import './ReviewTile.css'

const ReviewTile = ({ review }) => {
  const sessionUser = useSelector(state => state.session.user);
  const date = new Date(review.createdAt)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const checkUser = sessionUser?.id === review.userId
  const user = sessionUser?.id
  return (
    <div>
      <div className="review-tile">
        <div>
          <h3>{review.User?.firstName}</h3>
          <p>{month} {year}</p>
          <p>{review.review}</p>
        </div>
      </div>
      {user && checkUser && <OpenModalButton buttonText='Delete' modalComponent={<DeleteReviewModal reviewId={review.id} />} />}
    </div>
  )
}


export default ReviewTile
