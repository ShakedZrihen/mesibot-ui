import axios from 'axios';
import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const getTokenFromStorage = () => {
  const { spotifyToken } = localStorage.getItem('spotifyToken');
  console.log('spotifyToken: ', spotifyToken);
  return spotifyToken ? JSON.parse(spotifyToken) : '';
};

const Player = ({ playlistData }) => {
  const [token, setToken] = useState({"access_token":"BQCAmU41pe88Gv6cJ4lf8UbFcL1jaiyyWb1dugJCYIo7VCYu1UH0Xi6PB-SAZQSyTT1ablIlX7I47r3dDhRg7i_l70VUp8pHIHTbO3gzAQvYqn28fEqRL6hZ3Ev0Iq73vA_Lhn34fQ0sXU0xy5xcTOzPEfq-tjck6Sg6-5OC99LvpFBrkMaLEBzp-euZhb67FeUHLwNBsfHS4Chyrf02dQhEvL_lhqKFs3Rp","token_type":"Bearer","expires_in":3600,"refresh_token":"AQCy-pVRL6y_ArqrozPQyF-cI_eaFOvsIyUJ4_OfEA5-dnte4bePu0q1kNRUbg-lokzv7QvKGGIf0BTh88FjnzdvzUjtS56vhvGy0-w87uUMSJzEhmc8isntogY4Y5hFKRw","scope":"streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read"});

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
