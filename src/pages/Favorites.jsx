import React from "react";
import CamerasItems from "../components/CamerasItems/CamerasItems";
import AppContext from "../context";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="content__title">
        <h1>My Favorites</h1>
      </div>
      <div className="cameras">
        {favorites.map((object, index) => (
          <CamerasItems
            key={index}
            favorited={true}
            onClickFavorite={onAddToFavorite}
            {...object}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
