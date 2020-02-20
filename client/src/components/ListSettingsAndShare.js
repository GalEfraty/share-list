import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import SubscribedUsersList from "./SubscribedUsersList";

const ListSettingsAndShare = ({ toggleShowShare, list, history }) => {
  const { currentUser } = useContext(authContext);
  const isCancelled = useRef(false);
  const [emailState, setEmailState] = useState("");
  const [showUsersState, setShowUsersState] = useState("");
  const [subscribedUsersState, setSubscribedUsersState] = useState("");
  const [isCurrentUserManagerState, setIsCurrentUserManagerState] = useState(
    false
  );
  const listLink = `${process.env.REACT_APP_DOMAIN}/list/join/${currentUser._id}/${currentUser.fullName}/${list._id}/${list.listName}`;

  useEffect(() => {
    const fetchSubscribedUsersData = () => {
      axios
        .get(`/api/getsubscribedusers/${list._id}`)
        .then(response => {
          if (!isCancelled.current) {
            setSubscribedUsersState(response.data.subscribedUsers);
          }
          response.data.subscribedUsers.forEach(subscribedUser => {
            if (
              subscribedUser.manager &&
              subscribedUser.user._id === currentUser._id
            ) {
              setIsCurrentUserManagerState(true);
            }
          });
        })
        .catch(error => {
          console.log("couldnt fetch subscribed users", error);
          setSubscribedUsersState("");
          window.alert("error in fetchSubscribedUsersData");
        });
    };
    fetchSubscribedUsersData();

    return () => {
      isCancelled.current = true;
    };
  }, [showUsersState, list, currentUser]);

  const handleShareLink = e => {
    e.preventDefault();
    axios
      .post("/api/shareListViaEmail", { emailTo: emailState, listLink })
      .then(() => {
        toggleShowShare();
      })
      .catch(error => {
        console.log("error in handleShareLink: ", error);
        //implement share settings error state...
        toggleShowShare();
      });
  };

  const onEmailChange = e => {
    setEmailState(e.target.value);
  };

  const onFormClose = () => {
    setEmailState("");
    toggleShowShare();
  };

  const toggleShowUsers = () => {
    showUsersState ? setShowUsersState(false) : setShowUsersState(true);
  };

  const isUserLoneManager = () => {
    if (isCurrentUserManagerState) {
      for (let subscribedUser of subscribedUsersState) {
        if (
          subscribedUser.user._id !== currentUser._id &&
          subscribedUser.manager
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const unsubscribeList = () => {
    axios
      .post("/api/unsubscribeUserFromList", {
        userIdToUnsubscribe: currentUser._id,
        listId: list._id
      })
      .then(() => {
        console.log("unsubscribed from list");
      })
      .catch(error => {
        console.log("error in unsubscribeList: ", error);
        window.alert("unable to unsubscribe from a list");
      });
  };

  const onUnsubscribeFromList = () => {
    if (!isCurrentUserManagerState) {
      if (subscribedUsersState.length === 1) {
        onDeleteList();
      } else {
        return unsubscribeList();
      }
    } else {
      if (isUserLoneManager()) {
        return window.alert(
          "unable to unsubscribe list, you are the only one manager. to unsubscribe it, you need to set some other manager, or delete list"
        );
      } else {
        return unsubscribeList();
      }
    }
  };

  const onDeleteList = () => {
    axios
      .post("/api/deleteList", { listIdToDelete: list._id })
      .then(() => {
        history.push("/");
      })
      .catch(error => {
        console.log("error in onDeleteList: ", error);
        window.alert("unable to delete list");
      });
  };

  return (
    <div>
      <div>
        <button onClick={onUnsubscribeFromList}>Unsubscribe</button>
        {isCurrentUserManagerState && (
          <button onClick={onDeleteList}>Delete List</button>
        )}
      </div>
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
        <div>
          {" "}
          <a href={`whatsapp://send?text=${listLink}`}>Share on WhatsApp</a>
        </div>
      </form>
      <button onClick={toggleShowUsers}>
        {subscribedUsersState ? subscribedUsersState.length : 0} users
        subscribed to this list
      </button>
      <button onClick={onFormClose}>X</button>
      {showUsersState && subscribedUsersState && (
        <SubscribedUsersList
          setSubscribedUsersState={setSubscribedUsersState}
          subscribedUsersState={subscribedUsersState}
          isCurrentUserManager={isCurrentUserManagerState}
          listId={list._id}
        />
      )}
    </div>
  );
};

export default ListSettingsAndShare;
