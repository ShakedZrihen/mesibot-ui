import { useEffect, useState } from 'react';
import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDispatch } from 'react-redux';
import { currSongStarted } from '../../state/actions/playlist';

const Player = ({ playlist }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState({
    access_token:
      'BQAm8rYdaIFKriS2enJNQuuuBk6rBshMV7jvis_hF2g9AliLSiU4qDy037Y4ZgbQaunVViMg1djdTkcPDG0yQL84yyg_JO4YdxugpurAUUqD3cd3ssXG2bHQO_4kakcAgDK-CnfYUSyJUoMPsBZIF0QYIhsmLx2LxWbIcHo0UTsib3Xgou9-oYaxUj6EfLUnq7e7vxJ2t1S6tAlsg_ZlXK0VvK2c_WhZ5SGT',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token:
      'AQAylbevgXwQSI_azSdsKHcVobIxbQmWEKEsp6paGixoKTF1z6P5UFZS-Hc5nvxZWjQgF3NX31b17ONByViSIdtGSODgSegE3FKSFZLYSpmSJQXEuieQostm7makfEkry1k',
    scope:
      'streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read'
  });

  const tracks = playlist.map((song) => song.uri);
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
        syncExternalDevice={true}
        magnifySliderOnHover={true}
        token={token.access_token}
        uris={tracks}
        callback={(state) => {
          const type = _.get(state, 'type');
          const progressMs = _.get(state, 'progressMs');
          if (
            type === 'track_update' &&
            progressMs === 0 &&
            state?.status === 'READY' &&
            state?.isPlaying &&
            state?.isActive
          ) {
            console.log('song-started', { type, state });
            currSongStarted()(dispatch);
          }
        }}
      />
    </div>
  );
};

export default Player;
