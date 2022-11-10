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
  const [playing, setPlaying] = useState(currSong?.map(({ uri }) => uri));
  const [orderedPlaylilst, setOrderedPlaylist] = useState(
    [...(currSong || []), ...playlist].map((song) => song.uri)
  );

  useEffect(() => {
    if (
      (currSong && currSong?.[0]?.uri !== playing?.[0]?.uri) ||
      (playlist?.length && !orderedPlaylilst.length)
    ) {
      setPlaying(currSong?.map(({ uri }) => uri));
      setOrderedPlaylist(
        [...(currSong || []), ...playlist].map((song) => song.uri)
      );
    }
  }, [currSong, playlist]);

  useEffect(() => {
    const getToken = async (code) => {
      const { data: token, status } = await axios.get(
        `${SERVICE_URL}/spotify/redirect?code=${code}`
      );
      if (status === 200) {
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CODE);
      }
    };
    const refreshToken = async (savedToken) => {
      const { data: token, status } = await axios.post(
        `${SERVICE_URL}/spotify/refresh`,
        { token: savedToken }
      );
      if (status === 200) {
        setToken({ ...savedToken, ...token });
        localStorage.setItem(
          'token',
          JSON.stringify({ ...savedToken, ...token })
        );
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CODE);
      }
    };
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage && !token.access_token) {
      refreshToken(JSON.parse(tokenFromLocalStorage));
      const intervalId = setInterval(() => {
        refreshToken(JSON.parse(tokenFromLocalStorage));
      }, [30000]);
      return () => clearInterval(intervalId);
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
  }, []);

  // console.log({ currSong });
  // const tracks = [...(currSong || []), ...orderedPlaylilst].map(
  //   (song) => song.uri
  // );
  // console.log({ tracks });
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
        uris={_.uniq(orderedPlaylilst).filter(Boolean)}
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
      />
    </div>
  );
};

export default Player;
