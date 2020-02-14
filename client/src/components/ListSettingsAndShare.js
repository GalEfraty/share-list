import React, { useContext, useState, useEffect } from "react";
import axios from "axios"
import { authContext } from "../context/auth";
import SubscribedUsersList from "./SubscribedUsersList"

const ListSettingsAndShare = ({ toggleShowShare, list }) => {
  const { currentUser } = useContext(authContext);
  const [emailState, setEmailState] = useState("");
  const [showUsersState, setShowUsersState] = useState("")
  const [subscribedUsersState, setSubscribedUsersState] = useState("")
  const listLink = `https://gal-share-list.herokuapp.com/list/${list._id}`;

  useEffect(() => {
    const fetchSubscribedUsersData = async () => {
      try {
        const {data: {subscribedUsers}} = await axios.post("/api/getsubscribedusers", {userIds: list.subscribedUsers})
        setSubscribedUsersState(subscribedUsers)
      } catch (error) {
        console.log("couldnt fetch subscribed users", error)
        setSubscribedUsersState("")
      }
    }
    fetchSubscribedUsersData()
  },[showUsersState])

  const handleShareLink = e => {
    e.preventDefault();
    console.log(
      `${currentUser.fullName} send a mail to ${emailState} with list link: ${listLink}`
    );
    toggleShowShare();
  };

  const onEmailChange = e => {
    setEmailState(e.target.value);
  };

  const onFormClose = () => {
    setEmailState("");
    toggleShowShare();
  };

  const toggleShowUsers = () =>{
    showUsersState ? setShowUsersState(false) : setShowUsersState(true)
  }

  return (
    <div>
      <div>
        <label>
          {" "}
          list link
          <input type="text" disabled value={listLink} />
        </label>
      </div>
      <form onSubmit={handleShareLink}>
        <label>
          share List link to a friend via email
          <input
            type="email"
            name="email"
            placeholder="friend's email"
            value={emailState}
            onChange={onEmailChange}
          />
        </label>
        <button type="submit">Share via email</button>
      </form>
      <button onClick={toggleShowUsers}>X users subscribed to this list</button>
      <button onClick={onFormClose}>X</button>
      {showUsersState && subscribedUsersState && <SubscribedUsersList  subscribedUsersState={subscribedUsersState} listManagers={list.managers}/>}
    </div>
  );
};

export default ListSettingsAndShare;
