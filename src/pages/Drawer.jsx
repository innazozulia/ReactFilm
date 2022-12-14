import React from "react";
import axios from "axios";
import Info from "./Info";
import AppContext from "../context";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onRemove, onClose, items = [] }) {
  const { cardItems, setCardItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoadingInfo, setIsLoadingInfo] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoadingInfo(true);
      const { data } = await axios.post(
        "http://localhost:8080/order/checkout",
        {
          items: cardItems,
        },
      );
      setIsOrderComplete(true);
      setCardItems([]);
    } catch (error) {
      console.log(error);
    }
    setIsLoadingInfo(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Shopping Cart
          <img
            onClick={onClose}
            className="remove"
            width={20}
            src="img/remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className="basket__items">
            <div className="cart__items">
              {items.map((obj) => (
                <div
                  className="cart__item"
                  key={obj.id}>
                  <img
                    width={80}
                    height={80}
                    src={obj.imageUrl}
                    alt="Film Camera"
                  />
                  <div className="cart__item-text">
                    <p>{obj.title}</p>
                    <b>{obj.price}$</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="remove"
                    width={20}
                    src="img/remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="tax__block">
              <ul>
                <li className="tax__item">
                  <span>Summary :</span>
                  <div></div>
                  <b>{totalPrice} $</b>
                </li>
                <li className="tax__item">
                  <span>Tax 5% :</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} $ </b>
                </li>
              </ul>
              <button
                disabled={isLoadingInfo}
                onClick={onClickOrder}
                className="green__btn">
                Checkout
                <img
                  width={20}
                  src="img/right.png"
                  alt="Arrow"
                />
              </button>
              <button
                onClick={onClose}
                className="green__btn back__btn">
                Back
                <img
                  width={20}
                  src="img/left.png"
                  alt="Back"
                />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order is processed" : "Basket is empty"}
            description={
              isOrderComplete
                ? `Your order is completed, wait for a call from the manager`
                : "Please, add some item"
            }
            image={isOrderComplete ? "img/order.png" : "img/box.png"}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
