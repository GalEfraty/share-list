import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { authContext } from "../../context/auth";
import SubscribedUsersList from "./SubscribedUsersList";
import "../../styles/listSettings.css";
import copy from "copy-to-clipboard";

const ListSettingsAndShare = ({ toggleShowShare, list, history }) => {
  const { currentUser } = useContext(authContext);
  const isCancelled = useRef(false);
  const [emailState, setEmailState] = useState("");
  const [showUsersState, setShowUsersState] = useState("");
  const [subscribedUsersState, setSubscribedUsersState] = useState("");
  const [isCurrentUserManagerState, setIsCurrentUserManagerState] = useState(
    false
  );
  const [copyBtnState, setCopyBtnState] = useState("Copy Share Link");
  const [listNameEditState, setListNameEditState] = useState(list.listName);
  const listLink = encodeURI(
    `${process.env.REACT_APP_DOMAIN}/list/join/${currentUser._id}/${currentUser.fullName}/${list._id}/${list.listName}`
  );

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
    console.log("listname: ", list.listName);

    axios
      .post("/api/shareListViaEmail", {
        emailTo: emailState,
        listLink,
        listName: list.listName
      })
      .then(() => {
        toggleShowShare();
      })
      .catch(error => {
        console.log("error in handleShareLink: ", error);
        toggleShowShare();
      });
  };

  const onEmailChange = e => {
    setEmailState(e.target.value);
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
        history.push("/");
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

  const copyShareLink = () => {
    copy(listLink);
    setCopyBtnState("Link copied!");
  };

  const onListNameEditChange = e => {
    setListNameEditState(e.target.value);
  };

  const handleChangeListName = () => {
    axios
      .post("/api/changeListName", {
        listId: list._id,
        newListName: listNameEditState
      })
      .then(response => {
        console.log("list name changed to: ", response.data.newListName);
        toggleShowShare();
      })
      .catch(error => {
        console.log("error in handleChangeListName: ", error);
        window.alert("unable to change list name");
      });
  };

  return (
    <div className="list-settings-wrapper">
      <fieldset className="settings-fieldset settings-general-fieldset">
        <legend className="w-auto settings-legend">General</legend>
        <div className="settings-danger-wrapper">
          <button
            className="settings-danger-btns"
            onClick={onUnsubscribeFromList}
          >
            Unsubscribe
          </button>
          {isCurrentUserManagerState && (
            <button className="settings-danger-btns" onClick={onDeleteList}>
              Delete List
            </button>
          )}
        </div>
        <form onSubmit={handleChangeListName}>
          <fieldset className="settings-general-edit-fieldset">
            <legend className="w-auto settings-edit-title-legend">
              Edit list name
            </legend>
            <div className="settings-edit-form-wrapper">
              <input
                className="settings-general-new-list-name-input"
                required
                type="text"
                name="listName"
                value={listNameEditState}
                onChange={onListNameEditChange}
              />
              <button
                type="submit"
                className="settings-general-change-name-btn"
              >
                <i className="fas fa-edit settings-general-change-name-btn-icon"></i>
              </button>
            </div>
          </fieldset>
        </form>
      </fieldset>
      <fieldset className="settings-fieldset settings-share-fieldset">
        <legend className="w-auto settings-legend">Share</legend>
        <div className="settings-share-copy-whatsapp-wrapper">
          <button className="settings-share-copy-btn" onClick={copyShareLink}>
            <i className="far fa-copy settings-share-copy-icon"></i>
            {copyBtnState}
          </button>
          <a href={encodeURI(`whatsapp://send?text=${listLink}`)}>
            <i className="fab fa-whatsapp-square settings-share-whatsapp-icon"></i>
          </a>
        </div>

        <form onSubmit={handleShareLink}>
          <fieldset className="settings-share-email-fieldset">
            <legend className="w-auto settings-share-title-legend">
              Share List by email
            </legend>
            <div className="settings-share-form-wrapper">
              <span className="settings-share-shtrudel-wrapper">@</span>
              <input
                className="settings-share-email-input"
                required
                type="email"
                name="email"
                placeholder="friend's email"
                value={emailState}
                onChange={onEmailChange}
              />
              <button type="submit" className="settings-share-send-email-btn">
                <i className="far fa-paper-plane settings-share-send-email-btn-icon"></i>
              </button>
            </div>
          </fieldset>
        </form>
      </fieldset>

      <fieldset className="settings-fieldset settings-users-fieldset">
        <legend className="w-auto settings-legend">Users</legend>
        <div className="settings-users-show-btn-wrapper">
          <button onClick={toggleShowUsers} className="settings-users-show-btn">
            {subscribedUsersState ? subscribedUsersState.length : 0} users
            subscribed to this list (show)
          </button>
        </div>
        {showUsersState && subscribedUsersState && (
          <SubscribedUsersList
            setSubscribedUsersState={setSubscribedUsersState}
            subscribedUsersState={subscribedUsersState}
            isCurrentUserManager={isCurrentUserManagerState}
            listId={list._id}
            setShowUsersState={setShowUsersState}
          />
        )}
      </fieldset>
    </div>
  );
};

export default ListSettingsAndShare;
