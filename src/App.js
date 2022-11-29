import React from "react";
import Header from "./pages/Header";
import Slider from "./pages/Slider";
import Home from "./pages/Home";
import Drawer from "./pages/Drawer";
import { Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import axios from "axios";

function App() {
  const [items, setItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cardItems, setCardItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const [cardOpened, setCardOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsPageLoading(true);
      const itemsResponse = await axios.get("http://localhost:8080/cameras");
      const favoritesResponse = await axios.get(
        "https://628112b11020d852058523c6.mockapi.io/favorite",
      );
      const cardResponse = await axios.get(
        "https://628112b11020d852058523c6.mockapi.io/card",
      );
      setIsPageLoading(false);
      setItems(itemsResponse.data);
      setCardItems(cardResponse.data);
      setFavorites(favoritesResponse.data);
    }
    fetchData();
  }, []);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://628112b11020d852058523c6.mockapi.io/favorite/${obj.id}`,
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id)),
        );
      } else {
        const { data } = await axios.post(
          "https://628112b11020d852058523c6.mockapi.io/favorite",
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddToCart = async (obj) => {
    try {
      const findItem = cardItems.find(
        (item) => Number(item.parentId) === Number(obj.id),
      );
      if (findItem) {
        setCardItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(
          `https://628112b11020d852058523c6.mockapi.io/card/${findItem.id}`,
        );
      } else {
        setCardItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://628112b11020d852058523c6.mockapi.io/card",
          obj,
        );
        setCardItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isAddedItems = (id) => {
    return cardItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cardItems,
        favorites,
        setCardItems,
        isAddedItems,
        onAddToFavorite,
        onAddToCart,
        setCardOpened,
      }}>
      <div className="wrapper">
        {cardOpened ? (
          <Drawer
            items={cardItems}
            // onRemove={onRemoveItem}
            onClose={() => setCardOpened(false)}
          />
        ) : null}
        <Header onClickCard={() => setCardOpened(true)} />
        <Slider />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cardItems={cardItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isPageLoading={isPageLoading}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={<Favorites />}
          />
          <Route
            path="/orders"
            exact
            element={<Orders />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
