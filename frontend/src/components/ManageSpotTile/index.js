
import OpenModalButton from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpotTile.css'
import { NavLink, Link } from 'react-router-dom';

const ManageSpotTile = ({ spot }) => {

  return (
    <NavLink to={`/spots/${spot.id}`} className='manage-link'>
      <div className="manage-spot-tile">

        <div className="manage-prev-img-box">
          <img src={spot.previewImage} alt='' className="manage-preview-img" />
        </div>
        <div className="manage-spot-details">
          <div className="location">
            {spot.city}, {spot.state}
          </div>
          <div className="avg-rating">
            {spot.avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {spot.avgRating.toFixed(1)}</> : <><i className="fa-solid fa-star fa-xs"></i> New</>}
          </div>

          <div className="price">
            ${spot.price} night
          </div>
        </div>
          <div className="btn-box">
            <Link className="update-btn" to={`/spots/${spot.id}/edit`}><button >Update</button></Link>
            <OpenModalButton buttonText='Delete' className='delete-btn' modalComponent={<DeleteSpotModal spotId={spot.id} />} />
          </div>
      </div>
    </NavLink>
  );
};

export default ManageSpotTile;
