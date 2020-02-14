import React, { useState } from "react";
import axios from "axios";

const ListItem = ({
  listId,
  fetchList,
  itemData: { _id, itemName, category, checked }
}) => {
  const [checkedState, setCheckedState] = useState(checked);

  const handleRemoveItem = async () => {
    axios.delete(`/api/removeitem/${_id}/${listId}`).then(() => {
      fetchList();
    });
  };

  const handleCheckedChange = async e => {
    setCheckedState(e.target.checked);
     await axios.put(`/api/checklistitem/${listId}/${_id}/${e.target.checked}`)
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={checkedState}
        onChange={handleCheckedChange}
      />{" "}
      {itemName} {category && `categoty: ${category}`}
      <button onClick={handleRemoveItem}>X</button>
    </div>
  );
};

export default ListItem;
