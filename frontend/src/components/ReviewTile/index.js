import './ReviewTile.css'

const ReviewTile = ({ review }) => {
  const date = new Date(review.createdAt)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return (
    <div className="review-tile">
      <h3>{review.User.firstName}</h3>
      <p>{month} {year}</p>
      <p>{review.review}</p>
    </div>
  )
}


export default ReviewTile
