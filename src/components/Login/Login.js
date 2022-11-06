import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { profileSelector } from '../../state/selectors/profile';
import './Login.scss';
import { useHistory } from 'react-router';
import { LOCAL_STORAGE_KEYS } from '../common/utils/utils';

const Login = () => {
    const history = useHistory();
    const profile = useSelector(profileSelector);
    const profileName = _.get(profile, 'name');

    const lastPathname = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_PATHNAME);

    useEffect(() => {
        if (profileName) {
            history.push(lastPathname);
        }
    }, [profileName, history, lastPathname]);
    return (
        <div className='Login'>
            Please Login to Mesibot
        </div>
    )
}

export default Login;