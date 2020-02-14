import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "../context/auth";

import PrivateRoute from "./PrivateRoute";
import Home from "./Home.js";
import LoginPage from "./LoginPage";
import ListView from "./ListView";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/list/:id" component={ListView} />
          <Route exact path="/login" component={LoginPage} />
        </div>
      </Router>
    </AuthProvider>
  );
};



export default App;