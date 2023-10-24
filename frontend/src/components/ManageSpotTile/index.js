
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpotTile.css'

const ManageSpotTile = ({ spot }) => {

  return (
    <div className="spot-tile">
      <div className="tooltip">{spot.name}</div>
      <div className="img-container">
        <img src={spot.previewImage} alt='' className="preview-img" />
        <div className="location">
          {spot.city}, {spot.state}
        </div>
        <div className="avg-rating">
          {spot.avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {spot.avgRating.toFixed(1)}</> : 'New'}
        </div>
      </div>
      <div className="price">
        ${spot.price} night
      </div>
      <div className="btn-box">
        <Link to={`/spots/${spot.id}/edit`}><button className="btn">Update</button></Link>
        <OpenModalButton buttonText='Delete' modalComponent={<DeleteSpotModal spotId={spot.id} />} />
      </div>
    </div>
  );
};

export default ManageSpotTile;
