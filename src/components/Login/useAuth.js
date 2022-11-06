import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../state/actions/profile";
import { omitFromQs } from "../common/utils/utils";

const SLACK_AUTH_QS = 'userSlackId'


const useAuth = () => {
    const dispatch = useDispatch();
    const [slackUserId, setSlackUserId] = useState(null);
    const slackUserIdFromStorage = localStorage.getItem(SLACK_AUTH_QS);

    const omitSlackUserIdFromQuery = () => {
        const qsSlackUserId = omitFromQs(SLACK_AUTH_QS);
        if (qsSlackUserId) {
            localStorage.setItem(SLACK_AUTH_QS, qsSlackUserId);
            setSlackUserId(qsSlackUserId);
        }
    }

    useEffect(() => {
        omitSlackUserIdFromQuery();
    }, []);

    useEffect(() => {
        if (slackUserIdFromStorage) {
            console.log('try-auto-login', { slackUserIdFromStorage });
            login()(dispatch);
        } else {
            console.log('logout');
            logout()(dispatch);
        }
    }, [slackUserIdFromStorage, dispatch])

    return {
        slackUserId
    }
}

export default useAuth;