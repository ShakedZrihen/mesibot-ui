import _ from 'lodash';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from '../../common/utils/utils';
import { PROFILE_STATES } from "../../state/reducers/profile";
import { profileSelector } from "../../state/selectors/profile";
import ROUTES_MODEL from "../routes.model";

const AuthRoute = (props) => {
  const history = useHistory();
  const location = useLocation();
  const profile = useSelector(profileSelector);
  useEffect(() => {
    if (profile === PROFILE_STATES.NOT_AUTH) {
      const pathname = _.get(location, 'pathname');
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_PATHNAME, pathname);
      history.replace(ROUTES_MODEL.LOGIN.path);
    }
  }, [profile, history, location])
  return <Route {...props} />;
};

export default AuthRoute;
