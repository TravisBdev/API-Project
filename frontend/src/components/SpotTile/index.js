import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './SpotTile.css'

const SpotTile = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`} className='link'>
      <div className="spot-tile">

        <div className="tooltip">{spot.name}</div>

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
        </div>
      </div>
    </Link>
  );
};

export default SpotTile;
