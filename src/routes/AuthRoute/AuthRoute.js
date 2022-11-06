import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { profileSelector } from '../../state/selectors/profile';
import history from '../history';
import ROUTES_MODEL from '../routes.model';


const AuthRoute = (props) => {
  const profile = useSelector(profileSelector);
  if (!profile) {
    console.log('profile not exists. redirect to Login');
    // history.replace(ROUTES_MODEL.LOGIN.path);
  }
  return (<Route {...props} />);
}

export default AuthRoute;