import React from "react";

const SubscribedUser = ({
  subscribedUser,
  isManager,
  isMe,
  isCurrentUserManager,
  removeUser,
  makeUserManager
}) => {
  const me = <i className="fas fa-user"></i>;
  const others = <i className="far fa-user"></i>;
  const avatar = isMe ? me : others;

  const onUnsubscribeUserFromList = () => {
    removeUser(subscribedUser.user._id);
  };

  const onMakeUserManager = () => {
    makeUserManager(subscribedUser.user._id)
  }

  return (
    <div className="chat-OnlineUser-wrapper">
      <span> {avatar}</span>
      <span>
        {subscribedUser.fullName} {isMe && "(me)"} {isManager && "(manager)"}
      </span>
      <span>
        {!isMe && !isManager && isCurrentUserManager && (
          <button onClick={onUnsubscribeUserFromList}>X</button>
        )}
      </span>
      <span>
      {!isMe && !isManager && isCurrentUserManager && <button onClick={onMakeUserManager}>Make this user a manager</button>}
      </span>
    </div>
  );
};

export default SubscribedUser;
