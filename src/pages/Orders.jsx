import axios from "axios";
import React from "react";

import AppContext from "../context";

import CamerasItems from "../components/CamerasItems/CamerasItems";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const { onAddToCart, onAddtoFavorite } = React.useContext(AppContext);
  //   const [isLoadingOrders, setIsLoadingOrders] = React.useState(true);

  //   React.useEffect(() => {
  //     try {
  //       (async () => {
  //         const { data } = await axios.get(
  //           "https://628112b11020d852058523c6.mockapi.io/orders",
  //         );
  //         setOrders(data.flatMap((obj) => obj.items));
  //         setIsLoadingOrders(false);
  //       })();
  //     } catch (error) {
  //       alert("error");
  //     }
  //   }, []);

  return (
    <div className="content">
      <div className="content__title">
        <h1>My Orders</h1>
      </div>
      <div className="cameras">
        <CamerasItems
        //   key={item.id}
        //   onClickFavorite={(obj) => onAddtoFavorite(obj)}
        //   onPlus={(obj) => onAddToCart(obj)}
        //   loading={isLoadingOrders}
        //   {...item}
        />
      </div>
    </div>
  );
}

export default Orders;
