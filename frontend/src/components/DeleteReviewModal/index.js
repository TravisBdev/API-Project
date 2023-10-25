import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom"
import { deleteAReview } from "../../store/reviews"
import { useModal } from '../../context/Modal'


const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const { closeModal } = useModal()

  const handleDelete = () => {
    dispatch(deleteAReview(reviewId))
    // history.push('/spots/current')
    closeModal()
  }

  const cancelDelete = () => {
    closeModal()
  }

  return (
    <div className="delete-box">
      <div className="delete-confirmation">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
      </div>
      <div className="btn-box">
        <button onClick={handleDelete}>Yes (Delete Review)</button>
        <button onClick={cancelDelete}>No (Keep Review)</button>
      </div>
    </div>
  )
}



export default DeleteReviewModal
