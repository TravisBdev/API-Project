import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteASpot } from "../../store/spots"
import { useModal } from '../../context/Modal'
import './DeleteSpotModal.css'


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
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>
      <div className="btn-box">
        <button id="yes" onClick={handleDelete}>Yes (Delete Spot)</button>
        <button id="no" onClick={cancelDelete}>No (Keep Spot)</button>
      </div>
    </div>
  )
}



export default DeleteSpotModal
