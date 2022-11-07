import axios from 'axios';
import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const getTokenFromStorage = () => {
  const { spotifyToken } = localStorage.getItem('spotifyToken');
  console.log('spotifyToken: ', spotifyToken);
  return spotifyToken ? JSON.parse(spotifyToken) : '';
};

const Player = ({ playlistData }) => {
  const [token, setToken] = useState({
    access_token:
      'BQC6qRJPIOHa3yvmIFj9SDZ4ZT5PDM8bLFeBNLdbKGGPAmoQLxPKdzV3QAAFj9Sawj0n_MyFT3FDfrPPIQIZMTAAfqyTnPiSmWRrtYSsmVm3mLU1ev0B2-WfgU0syBueJTg4po-KMCz_lmbG-j3u8WYjTqlAP4T4TGc7CCu5PJ1pgJLRE5RRnAqZAhiboTObDduUfOtHhG9p',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token:
      'AQC4RKmm7Fi4EROFPabHOQTpjQZ3q_mVzUoo7PJk6NgrO8CEVIRYpPCUtTOL9SLn9bAn6DHWOtIp__TNFEXTV9TQmcj3O5Yp74jkIdIlguA7FLt79jxTIGijESIrB-950j4',
    scope:
      'streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read'
  });

  useEffect(() => {
    setTimeout(() => {
      const refresh = async () => {
        console.log('refreshing...');
        const res = await axios
          .post('https://mesibot.ngrok.io/spotify/refresh', {
            token
          })
          .catch((e) => console.log({ e }));
        console.log({ res });
        setToken({ ...res.data, refresh_token: token.refresh_token });
        localStorage.setItem('spotifyToken', JSON.stringify({ ...res.data, refresh_token: token.refresh_token }));
      };
      refresh();
    }, 200000);
  }, [token.access_token]);

  const tracks = playlistData?.map(({ uri }) => uri);
  return (
    <div>
      <SpotifyPlayer
        styles={{
          activeColor: '#fff',
          bgColor: '#222326',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff'
        }}
        token={token.access_token}
        uris={tracks}
      />
      ;
    </div>
  );
};

export default Player;
