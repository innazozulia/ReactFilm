import React from "react";
import AppContext from "../../context";
import style from "./Card.module.scss";

const CamerasItems = ({
  id,
  title,
  imageUrl,
  price,
  onPlus,
  onClickFavorite,
  favorited = false,
}) => {
  const { isAddedItems } = React.useContext(AppContext);
  const [isFavorite, setIsFavorive] = React.useState(favorited);

  const onFavorite = () => {
    onClickFavorite({ id, parentId: id, title, price, imageUrl });
    setIsFavorive(!isFavorite);
  };

  const obj = { id, parentId: id, title, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  return (
    <div className={style.card}>
      <div
        className={style.favorite}
        onClick={onClickFavorite}>
        <img
          onClick={onFavorite}
          width={15}
          src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
          alt="like"
        />
      </div>
      <img
        className={style.img}
        width="100%"
        heigth={112}
        src={imageUrl}
        alt="camera"
      />
      <h5>{title} </h5>
      <div className={style.card__button}>
        <div className={style.card__button__item}>
          <span>Price:</span>
          <b>{price} $</b>
        </div>
        <button
          onClick={onClickPlus}
          className={style.btn__plus}>
          <img
            width={20}
            heigth={20}
            src={isAddedItems(id) ? "img/checked.png" : "img/plus.svg"}
            alt="plus"
          />
        </button>
      </div>
    </div>
  );
};

export default CamerasItems;
