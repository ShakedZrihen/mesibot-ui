import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../state/actions/profile';
import { LOCAL_STORAGE_KEYS, omitFromQs } from '../../common/utils/utils';

const useAuth = () => {
  const dispatch = useDispatch();
  const [slackUserId, setSlackUserId] = useState(null);
  const slackUserIdFromStorage = localStorage.getItem(
    LOCAL_STORAGE_KEYS.SLACK_AUTH_QS
  );

  const omitSlackUserIdFromQuery = () => {
    const qsSlackUserId = omitFromQs(LOCAL_STORAGE_KEYS.SLACK_AUTH_QS);
    if (qsSlackUserId) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SLACK_AUTH_QS, qsSlackUserId);
      setSlackUserId(qsSlackUserId);
    }
  };

  useEffect(() => {
    omitSlackUserIdFromQuery();
  }, []);

  useEffect(() => {
    if (slackUserIdFromStorage) {
      login(slackUserIdFromStorage)(dispatch);
    } else {
      logout()(dispatch);
    }
  }, [slackUserIdFromStorage, dispatch]);

  return {
    slackUserId
  };
};

export default useAuth;
