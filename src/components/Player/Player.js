import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDispatch } from 'react-redux';
import { currSongStarted } from '../../state/actions/playlist';
import { SERVICE_URL } from '../../common/utils/api.consts';
import usePlayer from './usePlayer';

const Player = ({ currSong, playlist }) => {
  const dispatch = useDispatch();
  const playerState = usePlayer({ currSong, playlist });

  return Object.keys(playerState.token).length === 0 ? (
    <div>
      <div className="token-not-available">
        Audio player isn't avaliable, please generate spotify token
      </div>
      <div
        className="get-token-btn"
        onClick={(e) => {
          const spotifyAuthUrl = `${SERVICE_URL}/spotify/grant`;
          window.location.replace(spotifyAuthUrl);
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
        magnifySliderOnHover={true}
        token={playerState.token.access_token}
        uris={_.uniq(playerState.orderedPlaylilst).filter(Boolean)}
        callback={(state) => {
          console.log('state', state);
          const type = _.get(state, 'type');
          // if (type === 'track_update' && state?.track.uri !== currSong?.uri) {
          //   console.log('song-started', { type, state });
          //   currSongStarted()(dispatch);
          // }
        }}
      />
    </div>
  );
};

export default Player;
