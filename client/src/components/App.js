import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import "../styles/general.css";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home/Home.js";
import LoginPage from "./LoginPage";
import ListView from "./ListView/ListView";
import JoinList from "./JoinList";
import Header from "./Headers/Header";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/list/:id" component={ListView} />
          <Route
            exact
            path="/list/join/:inviter/:inviterFullName/:listId/:listName"
            component={JoinList}
          />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
