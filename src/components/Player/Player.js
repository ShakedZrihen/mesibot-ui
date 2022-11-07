import { useState } from 'react';
import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDispatch } from 'react-redux';
import { currSongFinished } from '../../state/actions/playlist';

const Player = ({ currSong, playlist }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState({
    access_token:
      'BQDDTSGOzy2unfW0sSbt2lHNDRCFIlEYFIytil7dK9E6yqiU0n01e1trRyFAjodSIUUYFlaJFUg3Ny7fFXCHxEd4tLmPF4QuyTX0WOh7PBwvS_Fr6zvV_lx73hrhtnLtFePQqbBsCIbLPedk8Lksa6LTslsi1dpN_WVSRLbisA8WNbtmPemX2slvBR46EaIp9SPmKZ53T5wn',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token:
      'AQANtoTwxi8uR5ywvbmUMKs8pyrA4g_LLtXLzSiRzAfkCfB5yGjbqJKJZxS_H09p-GbdKqyItYbfn4wp5Rr4EnpBOOVKIfIlDa-MV4nV84QCDrHIM7LoZYJqLjfROALpRdQ',
    scope:
      'streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read'
  });
  const currSongUri = _.get(currSong, 'uri');
  console.log({ currSong, currSongUri });

  const tracks = [currSongUri, ...playlist.map((song) => song.uri)];
  console.log('flom', { tracks });
  console.log('TOKEN: ', token);
  return Object.keys(token).length === 0 ? (
    <div>
      <div className='token-not-available'>Audio player isn't avaliable, please generate spotify token</div>
      <div
        className='get-token-btn'
        onClick={(e) => {
          e.stopPropagation();
          setToken('');
        }}
      >
        Get Token For Spotify
      </div>
    </div>
  ) : (
    <div>
      <SpotifyPlayer
        styles={{
          activeColor: 'white',
          bgColor: 'unset',
          color: 'white',
          loaderColor: '#fff',
          sliderColor: '#17E1BD',
          sliderTrackColor: '#61656C',
          sliderHandleColor: '#61656C',
          trackArtistColor: 'white',
          trackNameColor: 'white'
        }}
        token={token.access_token}
        uris={tracks}
        callback={(state) => {
          const PlayerSongUri = _.get(state, 'track.uri');
          const nextTrackUri = _.get(state, 'nextTracks[0].uri');
          if (!!currSongUri && currSongUri !== PlayerSongUri) {
            console.log('song-finished!');
            return currSongFinished()(dispatch);
          }
        }}
      />
    </div>
  );
};

export default Player;
