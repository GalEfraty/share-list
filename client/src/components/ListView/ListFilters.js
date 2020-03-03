import React from "react";

const ListFilters = ({
  allCategoriesState,
  selectedCategoryState,
  setSelectedCategoryState,
  searchState,
  setSearchState
}) => {

  const renderOptions = () => {
    let options = [];
    allCategoriesState.forEach(category => {
      options.push(
        <option key={category} value={category}>
          {category}
        </option>
      );
    });

    return options;
  };

  const onSelectChange = e => {
    setSelectedCategoryState(e.target.value);
  };

  const onSearchChange = (e) => {
      setSearchState(e.target.value)
  }

  return (
    <div className="list-filters-wrapper">
      <div className="list-filters-inner">
        <input
          className="list-filters-inner-elements list-filter-input"
          type="text"
          placeholder="Search Item"
          value={searchState}
          onChange={onSearchChange}
        />
        <select
          className="custom-select list-filters-inner-elements list-filter-select"
          value={selectedCategoryState}
          onChange={onSelectChange}
        >
          <option value="">All</option>
          {allCategoriesState && renderOptions()}
        </select>
        <span className="list-filters-inner-elements list-filter-icon-wrapper">
          <i className="fas fa-search list-filter-icon-inner"></i>
        </span>
      </div>
    </div>
  );
};

export default ListFilters;
