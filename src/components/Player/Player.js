import { useEffect, useState } from 'react';
import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDispatch } from 'react-redux';
import { currSongStarted } from '../../state/actions/playlist';
import { useLocation } from 'react-router';
import { LOCAL_STORAGE_KEYS } from '../../common/utils/utils';
import { SERVICE_URL } from '../../common/utils/api.consts';
import axios from 'axios';

const Player = ({ playlist }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState({});

  useEffect(() => {
    const getToken = async (code) => {
      const { data: token } = await axios.get(
        `${SERVICE_URL}/spotify/redirect?code=${code}`
      );
      setToken(token);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CODE);
    };
    if (!token.access_token) {
      const pathname = _.get(location, 'pathname');
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_PATHNAME, pathname);
      const code = localStorage.getItem(LOCAL_STORAGE_KEYS.CODE);
      if (code) {
        getToken(code);
        return;
      }
    }
  }, [token.access_token]);

  // console.log({ playlist });
  const tracks = playlist.map((song) => song.uri);

  return Object.keys(token).length === 0 ? (
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
        syncExternalDevice={true}
        magnifySliderOnHover={true}
        token={token.access_token}
        uris={tracks}
        callback={(state) => {
          if (state.error) {
            setToken({});
            return;
          }
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
            setTimeout(() => {
              currSongStarted()(dispatch);
            }, 1000);
          }
        }}
      />
    </div>
  );
};

export default Player;
