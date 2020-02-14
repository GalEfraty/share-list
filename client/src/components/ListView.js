import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "./AddItem";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";
import ListSettingsAndShare from "./ListSettingsAndShare"

const ListView = ({ match }) => {
  const [listState, setListState] = useState("");
  const [showSettingsState, setShowSettingsState] = useState(false)

  useEffect(() => {
      const fetchListData = async () => {
        const result = await axios.get(`/api/getListDate/${match.params.id}`)
        setListState(result.data)
      }
      fetchListData()
  }, [])


  const fetchList = async () => {
    axios.get(`/api/getListDate/${match.params.id}`).then(response => {
      setListState(response.data);
    });
  };

  const toggleShowShare = () => {
    showSettingsState ? setShowSettingsState(false) : setShowSettingsState(true)
  }

  const renderItems = () => {
    const { items } = listState;
    let ListItemComponents = [];
    if (items) {
      for (let item of items) {
        ListItemComponents.push(
          <ListItem
            key={item._id}
            listId={listState._id}
            fetchList={fetchList}
            itemData={item}
          />
        );
      }
    }
    return ListItemComponents;
  };

  return (
    <div>
      <h3>{listState.listName}</h3>
      <button onClick={toggleShowShare}>Settings and Share</button>
      {showSettingsState && <ListSettingsAndShare toggleShowShare={toggleShowShare} list={listState}/>}
      <AddItem fetchList={fetchList} listState={listState} />
      <Link to="/">
        <button>back Home</button>
      </Link>

      {listState && renderItems()}
    </div>
  );
};

export default ListView;