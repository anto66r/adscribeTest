import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { StoreProvider } from "store";
import reducers from "store/reducers";
import initialState from "store/initialState";
import Main from "features/main";
import { Login } from "features/login";
import { Logout } from "features/logout";

const App = () => {
  return (
    <Router>
      <StoreProvider initialState={initialState} reducer={reducers}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route>
            <Main />
          </Route>
        </Switch>
      </StoreProvider>
    </Router>
  );
};

export default App;
