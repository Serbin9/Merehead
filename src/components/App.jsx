import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes";
const App = () => {
  return (
    <Switch>
      <Suspense fallback="Loading...">
        <Route
          exact
          path={routes.HomePage.path}
          component={routes.HomePage.component}
        />
        <Route
          path={routes.CreatePage.path}
          component={routes.CreatePage.component}
        />
        <Route
          path={routes.EditPage.path}
          component={routes.EditPage.component}
        />
        <Redirect to="/" />
      </Suspense>
    </Switch>
  );
};
export default App;
