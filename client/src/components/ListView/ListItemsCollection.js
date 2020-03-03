import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "./AddItem";
import ListItem from "./ListItem";
import ListFilters from "./ListFilters";
import "../../styles/list.css";

const ListItemsCollection = ({ listState, setListState }) => {
  const [allCategoriesState, setAllCategoriesState] = useState("");
  const [selectedCategoryState, setSelectedCategoryState] = useState("");
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    const fillAllCategories = () => {
      let allCategories = [];
      listState.items.forEach(item => {
        if (item.category) {
          allCategories.push(item.category);
        }
      });
      setAllCategoriesState(new Set(allCategories));
    };
    fillAllCategories();
  }, [listState]);

  const removeItem = itemId => {
    let items = listState.items.filter(item => {
      return !(item._id === itemId);
    });
    const tempListData = { ...listState, items };
    setListState(tempListData);

    axios
      .delete(`/api/removeitem/${itemId}/${listState._id}`)
      .then(() => {
        console.log("item deleted in server");
      })
      .catch(error => {
        console.error("error in handleRemoveItem: ", error);
        window.alert("unable to Remove Item");
      });
  };

  const changeCheckItem = (itemId, checked) => {
    axios
      .put(`/api/checklistitem/${listState._id}/${itemId}/${checked}`)
      .then(() => {
        console.log("item chack changed in db");
      })
      .catch(error => {
        console.error("error in handleCheckedChange: ", error);
        window.alert("error in handleCheckedChange");
      });
  };

  const addItem = (itemName, category) => {
    itemName = itemName.trim().toLowerCase();
    category = category.trim().toLowerCase();
    axios
      .post("/api/additem", {
        itemName: itemName,
        itemCategory: category,
        listId: listState._id
      })
      .then(response => {
        const newItem = response.data;
        let updatedItems = listState.items;
        updatedItems.push(newItem);
        const tempListData = { ...listState, updatedItems };
        setListState(tempListData);
      })
      .catch(error => {
        console.log("error in handleAddItem: ", error);
        window.alert("error in handleAddItem");
      });
  };

  const filterItems = items => {
    const filters = { category: selectedCategoryState, search: searchState };
    if (items) {
      let filtered = items.filter(item => {

        if (filters.category || filters.search) {
          let filterInCategory = false;
          let filterInSearch = false;

          if (filters.category) {
            if (filters.category === item.category) {
              filterInCategory = true;
            }
          } else{ filterInCategory = true }
          
          if (filters.search) {
            if (item.itemName.includes(filters.search.toLowerCase())) {
              filterInSearch = true;
            }
          } else {filterInSearch = true;}

          return filterInCategory && filterInSearch;
        }
        return false;
      });
      return filtered;
    }
    return "";
  };

  const renderItems = () => {
    console.log("rendering items!");
    const { items } = listState;

    let ListItemComponents = [];
    if (items) {
      const filteredItems =
        selectedCategoryState || searchState ? filterItems(items) : items;
      for (let item of filteredItems) {
        ListItemComponents.push(
          <ListItem
            key={item._id}
            listId={listState._id}
            itemData={item}
            removeItem={removeItem}
            changeCheckItem={changeCheckItem}
          />
        );
      }
    }
    return ListItemComponents;
  };

  return (
    <div>
      <AddItem addItem={addItem} />
      <ListFilters
        allCategoriesState={allCategoriesState}
        selectedCategoryState={selectedCategoryState}
        setSelectedCategoryState={setSelectedCategoryState}
        searchState={searchState}
        setSearchState={setSearchState}
      />
      <div className="container list-items-collection">
        {listState && renderItems()}
      </div>
    </div>
  );
};

export default ListItemsCollection;
