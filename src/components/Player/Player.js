import { useEffect, useState } from 'react';
import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDispatch } from 'react-redux';
import { currSongStarted } from '../../state/actions/playlist';

const Player = ({ playlist }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState({
    access_token:
      'BQAquSBUuPjQAFe5nAQ8H7uvGcm-B_HksBJ0f3GvbPW4QD-iMy8Hiqhxoga3e7a_faqFhnrjW-gmg4rU6oQZ22Uhhb1tio_tmPfjXBW1rvaUgKAvdVCPL2Tv6rZZ1B3623S3X6BhN3t5AK7ZvqgH4DMn2bBKWM2C5a2D6MNni7QUobpVXYtQFcg5nPPhMJgROiu7humTbHBp2tyNSQiOs0W3TbHNH0AxjQj-',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token:
      'AQD5rFsF39EcmLRPIZQJqVnnyM_Oe2biCPSqAhI2mMVZNTT25aWXqJRD3s8tJa9qzK5ceXj3Gu-7EloeZnOHMCG-ZuKZ6XzWITTe-klpFR7Y2-TWWqt5MUBDNpaUhsh7tEU',
    scope:
      'streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read'
  });
  // console.log({ playlist });
  const tracks = playlist.map((song) => song.uri);

  return (
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
          if (state.error) return;
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
