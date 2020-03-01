import React, { useContext } from "react";
import SubscribedUser from "./SubscribedUser";
import { authContext } from "../../context/auth";
import axios from "axios";

const SubscribedUsersList = ({
  subscribedUsersState,
  setSubscribedUsersState,
  isCurrentUserManager,
  listId
}) => {
  const { currentUser } = useContext(authContext);

  const removeUser = userId => {
    axios
      .post("/api/unsubscribeUserFromList", {
        userIdToUnsubscribe: userId,
        listId
      })
      .then(() => {
        const tempSubscribedUsers = subscribedUsersState.filter(
          subscribedUser => {
            return subscribedUser.user._id !== userId;
          }
        );
        setSubscribedUsersState(tempSubscribedUsers);
      })
      .catch(error => {
        console.log("error in removeUser: ", error);
        window.alert("unable to remove user");
      });
  };

  const makeUserManager = userId => {
    axios
      .post("/api/makeUserManager", { userId, listId })
      .then(() => {
        const tempSubscribedUsers = subscribedUsersState;
        tempSubscribedUsers.forEach(subscribedUser => {
          if (subscribedUser.user._id === userId) {
            subscribedUser.manager = true;
          }
        });
        setSubscribedUsersState(tempSubscribedUsers);
      })
      .catch(error => {
        console.log("error in makeUserManager: ", error);
        window.alert("unable make user a manager");
      });
  };

  const renderSubscribedUsers = () => {
    let subscribedUsersComponent = [];
    for (let subscribedUserObj of subscribedUsersState) {
      const isManager = subscribedUserObj.manager;
      const isMe = currentUser._id === subscribedUserObj.user._id;

      subscribedUsersComponent.push(
        <SubscribedUser
          key={subscribedUserObj.user._id}
          subscribedUser={subscribedUserObj.user}
          isManager={isManager}
          isMe={isMe}
          isCurrentUserManager={isCurrentUserManager}
          removeUser={removeUser}
          makeUserManager={makeUserManager}
        />
      );
    }
    return subscribedUsersComponent;
  };

  return (
    <div className="container settings-users-wrapper">
      {subscribedUsersState && renderSubscribedUsers()}
    </div>
  );
};

export default SubscribedUsersList;
