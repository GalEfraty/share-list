import React from "react";

const SubscribedUser = ({ subscribedUser, isManager, isMe }) => {

  const me = <i className="fas fa-user"></i>;
  const others = <i className="far fa-user"></i>;
  const avatar = isMe ? me : others;
  
  return (
    <div className="chat-OnlineUser-wrapper">
      {avatar} {subscribedUser.fullName} {isMe && "(me)"} {isManager && "(manager)"} 
    </div>
  );
};

export default SubscribedUser;
