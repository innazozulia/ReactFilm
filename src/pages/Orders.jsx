import axios from "axios";
import React from "react";

import AppContext from "../context";

import CamerasItems from "../components/CamerasItems/CamerasItems";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const { onAddToCart, onAddtoFavorite } = React.useContext(AppContext);
  const [isLoadingOrders, setIsLoadingOrders] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/order/history");
        setOrders(data);
        setIsLoadingOrders(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="content__title">
        <h1>My Orders</h1>
        <div className="cameras">
          {orders.map((item, index) => (
            <CamerasItems
              key={index}
              onClickFavorite={(obj) => onAddtoFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoadingOrders}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
