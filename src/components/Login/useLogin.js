import { useEffect, useState } from "react";
import { omitFromQs } from "../common/utils/utils";

const SLACK_AUTH_QS = 'userSlackId'

const useLogin = () => {
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
        if (slackUserIdFromStorage)
            console.log('try-auto-login', { slackUserIdFromStorage });
    }, [slackUserIdFromStorage])

    return {
        slackUserId
    }
}

export default useLogin;