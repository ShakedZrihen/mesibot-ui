import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { PROFILE_STATES } from "../../state/reducers/profile";
import { profileSelector } from "../../state/selectors/profile";
import ROUTES_MODEL from "../routes.model";

const AuthRoute = (props) => {
  const history = useHistory();
  const profile = useSelector(profileSelector);
  useEffect(() => {
    if (profile === PROFILE_STATES.NOT_AUTH) {
      history.replace(ROUTES_MODEL.LOGIN.path);
    }
  }, [profile, history])
  return <Route {...props} />;
};

export default AuthRoute;
