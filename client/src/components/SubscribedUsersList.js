import React, {useContext} from "react";
import SubscribedUser from "./SubscribedUser";
import { authContext } from "../context/auth";


const SubscribedUsersList = ({ subscribedUsersState, listManagers}) => {
  const { currentUser } = useContext(authContext);

  const renderSubscribedUsers = () => {
    let subscribedUsersComponent = [];
    for (let subscribedUserObj of subscribedUsersState) {
      const isManager = listManagers.includes(subscribedUserObj._id)
      const isMe = currentUser._id === subscribedUserObj._id;

      subscribedUsersComponent.push(
        <SubscribedUser key={subscribedUserObj._id} subscribedUser={subscribedUserObj} isManager={isManager} isMe={isMe}/>
      );
    }
    return subscribedUsersComponent;
  };

  return <div>{subscribedUsersState && renderSubscribedUsers()}</div>;
};

export default SubscribedUsersList;
