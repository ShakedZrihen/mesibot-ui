import './App.css';
import Routes from './routes/Routes';
import Header from '../src/components/Header';
import useAuth from './components/Login/useAuth';
import usePusher from './state/pusher/usePusher';

const App = () => {
  useAuth();
  usePusher();

  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
