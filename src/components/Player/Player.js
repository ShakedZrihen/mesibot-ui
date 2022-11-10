import { useEffect, useState } from 'react';
import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useDispatch } from 'react-redux';
import { currSongStarted } from '../../state/actions/playlist';
import { useLocation } from 'react-router';
import { LOCAL_STORAGE_KEYS } from '../../common/utils/utils';
import { SERVICE_URL } from '../../common/utils/api.consts';
import axios from 'axios';

const Player = ({ currSong, playlist }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState({});
  const [orderedPlaylilst, setOrderedPlaylist] = useState(playlist || []);
  const [playing, setPlaying] = useState(currSong?.uri);

  useEffect(() => {
    console.log({
      currSong,
      playing,
      playlist,
      condition:
        currSong?.uri !== playing ||
        (playlist?.length && !orderedPlaylilst.length)
    });
    if (
      currSong?.uri !== playing ||
      (playlist?.length && !orderedPlaylilst.length)
    ) {
      setPlaying(currSong?.uri);
      setOrderedPlaylist(playlist);
    }
  }, [currSong, playlist]);

  useEffect(() => {
    const getToken = async (code) => {
      const { data: token } = await axios.get(
        `${SERVICE_URL}/spotify/redirect?code=${code}`
      );
      setToken(token);
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CODE);
    };
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(JSON.parse(tokenFromLocalStorage));
      return;
    }
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
  const tracks = orderedPlaylilst.map((song) => song.uri);
  console.log({ tracks });
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
        uris={_.uniq([playing, ...tracks]).filter(Boolean)}
        callback={(state) => {
          console.log('state', state);
          if (state.error) {
            setToken({});
            return;
          }
          const type = _.get(state, 'type');
          if (type === 'track_update' && state?.track.uri !== currSong?.uri) {
            console.log('song-started', { type, state });
            currSongStarted()(dispatch);
          }
        }}
        handlePlayerErrors={(e) => console.log('here') || setToken({})}
      />
    </div>
  );
};

export default Player;
