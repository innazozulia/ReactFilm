import React from "react";
import CamerasItems from "../components/CamerasItems/CamerasItems";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isPageLoading,
}) => {
  const renderItems = () => {
    return (
      isPageLoading
        ? [...Array(20)]
        : items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
          )
    ).map((item, index) => (
      <CamerasItems
        key={index}
        onClickFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isPageLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="content__title">
        <h1>{searchValue ? `search ${searchValue}` : "all film cameras"}</h1>
        <div className="search__block">
          <img
            width={14}
            src="img/search.svg"
            alt="Search"
          />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search "
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear"
              width={20}
              src="img/remove.svg"
              alt="Clear"
            />
          )}
        </div>
      </div>

      <div className="cameras">{renderItems()}</div>
    </div>
  );
};

export default Home;
