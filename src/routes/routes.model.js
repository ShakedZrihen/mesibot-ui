import _ from 'lodash';
import Login from '../components/Login/Login';
import PlaylistView from '../../src/components/Playlist';
import { LOCAL_STORAGE_KEYS, omitFromQs } from '../common/utils/utils';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

const NotFound = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const qsCode = omitFromQs(LOCAL_STORAGE_KEYS.CODE);
    if (qsCode) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CODE, qsCode);
    }
    const lastPathname = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_PATHNAME);
    const pathname = _.get(location, 'pathname');
    if (lastPathname && pathname !== lastPathname) {
      history.push(lastPathname);
    }
  }, []);

  return <div>not found</div>;
};
const Playlist = () => <PlaylistView />;
const Stats = () => <div>Stats</div>;

const ROUTES_MODEL = {
  LOGIN: { path: '/login', component: Login },
  PLAYLIST: {
    path: '/playlist/:playlistId',
    component: Playlist,
    isAuth: true
  },
  STATS: { path: '/stats', component: Stats, isAuth: true },
  NOT_FOUND: { path: '*', component: NotFound, isAuth: true }
};

export default ROUTES_MODEL;
