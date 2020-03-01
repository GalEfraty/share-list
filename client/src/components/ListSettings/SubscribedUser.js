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
    removeUser(subscribedUser._id);
  };

  const onMakeUserManager = () => {
    makeUserManager(subscribedUser._id);
  };

  return (
    <div className="settings-users-user-wrapper">
      <span className="settings-users-user-avatar"> {avatar}</span>
      <span className="settings-users-user-name">
        {subscribedUser.fullName} {isMe && "(me)"} {isManager && "(manager)"}
      </span>
      <span>
        {!isMe && !isManager && isCurrentUserManager && (
          <button
            className="settings-users-user-unsubscribe-by-manager"
            onClick={onUnsubscribeUserFromList}
          >
            X
          </button>
        )}
      </span>
      <span>
        {!isMe && !isManager && isCurrentUserManager && (
          <button
            className="settings-users-user-make-manager"
            onClick={onMakeUserManager}
          >
          make manager
          </button>
        )}
      </span>
    </div>
  );
};

export default SubscribedUser;
