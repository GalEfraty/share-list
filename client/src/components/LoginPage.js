import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { authContext } from "../context/auth";

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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
