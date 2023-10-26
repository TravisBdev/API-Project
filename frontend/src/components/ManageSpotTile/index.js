
import OpenModalButton from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal';
import './ManageSpotTile.css'
import { NavLink, Link } from 'react-router-dom';

const ManageSpotTile = ({ spot }) => {

  return (
    <NavLink to={`/spots/${spot.id}`} className='link'>
      <div className="spot-tile">

        <div className="prev-img-box">
          <img src={spot.previewImage} alt='' className="preview-img" />
        </div>
        <div className="spot-details">
          <div className="location">
            {spot.city}, {spot.state}
          </div>
          <div className="avg-rating">
            {spot.avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {spot.avgRating.toFixed(1)}</> : <><i className="fa-solid fa-star fa-xs"></i> New</>}
          </div>

          <div className="price">
            ${spot.price} night
          </div>
          <div className="btn-box">
            <Link to={`/spots/${spot.id}/edit`}><button className="update-btn">Update</button></Link>
            <OpenModalButton buttonText='Delete' className='delete-btn' modalComponent={<DeleteSpotModal spotId={spot.id} />} />
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ManageSpotTile;
