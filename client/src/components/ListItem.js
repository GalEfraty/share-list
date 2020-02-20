import React, { useState } from "react";

const ListItem = ({
  removeItem,
  changeCheckItem,
  itemData: { _id, itemName, category, checked }
}) => {
  const [checkedState, setCheckedState] = useState(checked);
  const handleRemoveItem = () => {
    removeItem(_id);
  };

  const handleCheckedChange = async e => {
    setCheckedState(e.target.checked);
    changeCheckItem(_id, e.target.checked);
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
