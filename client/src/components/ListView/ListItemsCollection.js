import React from "react";
import axios from "axios";
import AddItem from "./AddItem";
import ListItem from "./ListItem";
import "../../styles/list.css";

const ListItemsCollection = ({ listState, setListState }) => {
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

  const renderItems = () => {
    const { items } = listState;
    let ListItemComponents = [];
    if (items) {
      for (let item of items) {
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
      <div className="container list-items-collection">
        {listState && renderItems()}
      </div>
    </div>
  );
};

export default ListItemsCollection;
