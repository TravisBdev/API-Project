import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteASpot } from "../../store/spots"
import { useModal } from '../../context/Modal'


const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()

  const handleDelete = () => {
    dispatch(deleteASpot(spotId))
    history.push('/spots/current')
    closeModal()
  }

  const cancelDelete = () => {
    closeModal()
  }

  return (
    <div className="delete-box">
      <div className="delete-confirmation">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>
      <div className="btn-box">
        <button onClick={handleDelete}>Yes (Delete Spot)</button>
        <button onClick={cancelDelete}>No (Keep Spot)</button>
      </div>
    </div>
  )
}



export default DeleteSpotModal
