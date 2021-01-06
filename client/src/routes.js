import React from "react";
import { Switch, Route } from "react-router-dom";
import CodeShare from "./components/CodeShare/CodeShare";
import Dashboard from "./components/Dashboard/Dashboard";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Dashboard}></Route>
      <Route
        exact
        path="/sharecode/:uniqueKey"
        component={CodeShare}
      />
    </Switch>
  </main>
);

export default Routes;
