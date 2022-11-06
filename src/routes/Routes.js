import { Switch, Router, Route } from "react-router-dom";
import _ from "lodash";
import AuthRoute from "./AuthRoute";
import history from "./history";
import ROUTES_MODEL from "./routes.model";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        {_.map(ROUTES_MODEL, (route) => {
          const WhichRoute = route.isAuth ? AuthRoute : Route;
          return (
            <WhichRoute
              key={route.path}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default Routes;
