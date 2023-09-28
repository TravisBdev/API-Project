import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './ManageSpotTile.css'
import { deleteASpot } from '../../store/spots';

const ManageSpotTile = ({ spot }) => {
  const dispatch = useDispatch()
  // console.log(spot.id);
  const handleDelete = () => {
    dispatch(deleteASpot(spot.id))
  }

  return (
    <div className="spot-tile">
      <div className="tooltip">{spot.name}</div>
      <div className="img-container">
        <img src={spot.previewImage} alt='' className="preview-img" />
        <div className="location">
          {spot.city}, {spot.state}
        </div>
        <div className="avg-rating">
          {spot.avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {spot.avgRating}</> : 'New'}
        </div>
      </div>
      <div className="price">
        ${spot.price} night
      </div>
      <div className="btn-box">
        <Link to={`/spots/${spot.id}/edit`}><button className="btn">Update</button></Link>
        <button className="btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ManageSpotTile;
