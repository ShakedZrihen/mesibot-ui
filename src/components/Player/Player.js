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
      'BQDEM8-2gcBKwEDIz2DUJ4GtUBYsMFmhYAzT8iYYXqfyOgZoqMMsSP7-f_ChUW8vYHVQ63VRr3IfnXWE3KR0lhSok3I6LVwgSmcMsIny8DscehkV9BXxA-cTXw2goQEh76k5wb8Kz42j-_iijp8hy_Byc3rY29UcbEXa5a-D3SKssFjEtGEuCycPXdD3cQK61ONJdszwhi11AUJOAvzWybm5-bvjKuDtxI5V',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token:
      'AQAD-4Ojtv3cv_UdhKENScwLVNhD6XNR3AI4AuNGzPur7oGZOAcuoF4hsjj8vcoJu6k4BqYrxC-kjacgujtYJ2BAgtxy-LAzob2pVi12fUaQID4AUo9NQ0QmHtLMYeFDrH8',
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
