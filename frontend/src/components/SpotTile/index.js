import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './SpotTile.css'

const SpotTile = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`} className='link'>
      <div className="spot-tile">
        <div className="tooltip">{spot.name}</div>
        <img src={spot.previewImage} alt='' className="preview-img" />
        <div className="spot-details">
          <div className="location">
            {spot.city}, {spot.state}
          </div>
          <div className="avg-rating">
            {spot.avgRating ? <><i className="fa-solid fa-star fa-xs"></i> {spot.avgRating.toFixed(1)}</> : 'New'}
          </div>

          <div className="price">
            ${spot.price} night
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpotTile;
