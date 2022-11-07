import axios from 'axios';
import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
  const [token, setToken] = useState({
    access_token:
      'BQDJ_3AzxSOMgDDzJ77jnfZr2bLG8fPF1-wQ9NpklwschQlYghwyueAsI-cWEH9E7GhTTft6YjhLiHvljFw_xAh0frQw0YKtDF11Rfpoa23-P6bpaYQ2TXUltjdjcV1M87RnRL9-GNBF66WiL1KeN5PL_CfbqJEno3PhTruxJWthgRkKDHyus0HYTV1bwhRe60tGFHzTfr4xNkUo144yOC1VscmjvQq95HLi',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token:
      'AQAcUNFqWTEh4mXHwTkKy1A-nfktctOx2T6Jj0q81ReiReE1zH3iQBtM4nmhpKFgPUtm0APpe__d42OJcCuJvIqRZ1P0AoSFm0BHkBIkuH1Vmx0BLDxmRrtWSJqs3_D9MPs',
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
      };
      refresh();
    }, 200000);
  }, [token.access_token]);

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
        token="BQDJ_3AzxSOMgDDzJ77jnfZr2bLG8fPF1-wQ9NpklwschQlYghwyueAsI-cWEH9E7GhTTft6YjhLiHvljFw_xAh0frQw0YKtDF11Rfpoa23-P6bpaYQ2TXUltjdjcV1M87RnRL9-GNBF66WiL1KeN5PL_CfbqJEno3PhTruxJWthgRkKDHyus0HYTV1bwhRe60tGFHzTfr4xNkUo144yOC1VscmjvQq95HLi"
        uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
      />
      ;
    </div>
  );
};

export default Player;
