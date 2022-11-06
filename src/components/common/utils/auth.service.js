
export const slackAuth = () => {
    const slackAuthUrl = 'http://localhost:555/auth/slack/grant';
    window.location.replace(slackAuthUrl);
}