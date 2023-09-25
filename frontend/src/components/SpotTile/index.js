import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SpotTile = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`}>
      <div className="spot-tile">
        <div className="img-container">
          <img src={spot.previewImage} alt='image of a spot' className="preview-img" />
          <div className="location">
            {spot.city}, {spot.state}
          </div>
          <div className="avg-rating">
            {spot.avgRating ? <><i class="fa-solid fa-star fa-xs"></i> {spot.avgRating}</> : 'New'}
          </div>
        </div>
        <div className="price">
          ${spot.price} night
        </div>
      </div>
    </Link>
  );
};

export default SpotTile;
