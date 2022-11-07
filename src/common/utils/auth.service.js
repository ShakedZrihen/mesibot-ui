import { SERVICE_URL } from "./api.consts";

export const slackAuth = () => {
    const slackAuthUrl = `${SERVICE_URL}/auth/slack/grant`;
    window.location.replace(slackAuthUrl);
}