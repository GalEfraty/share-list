import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { authContext } from "../context/auth";
import "../styles/login.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async e => {
      e.preventDefault();
      window.location.href = "/auth/google";
      history.push("/");
    },
    [history]
  );

  const { currentUser } = useContext(authContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-wrapper">
      <div className="container login-inner-wrapper">
        <h4 className="login-header">Login to Share List</h4>
        <form onSubmit={handleLogin}>
          <button className="login-submit-btn" type="submit">Login with google</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
