import './Login.scss';
import useLogin from './useLogin';

const Login = () => {
    const { slackUserId } = useLogin();
    console.log({ slackUserId })

    return (
        <div className='Login'>
            Login page
            <main>
                <a href='http://localhost:555/auth/slack/grant'>login</a>
            </main>
        </div>
    )
}

export default Login;