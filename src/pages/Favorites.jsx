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
        {favorites.map((item, index) => (
          <CamerasItems
            key={index}
            favorited={true}
            onClickFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;

// title={item.title}
// price={item.price}
// imageUrl={item.imageUrl}
