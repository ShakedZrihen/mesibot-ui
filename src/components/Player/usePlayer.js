import axios from 'axios';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { SERVICE_URL } from '../../common/utils/api.consts';
import { LOCAL_STORAGE_KEYS } from '../../common/utils/utils';

const updateTokenInLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.removeItem(LOCAL_STORAGE_KEYS.CODE);
};

const defaultState = {
  token: '',
  playing: [],
  orderedPlaylilst: [],
  loading: true
};

const usePlayer = ({ currSong, playlist }) => {
  const location = useLocation();
  //   const [playerState, setPlayerState] = useState(defaultState);
  const playerState = useRef(defaultState);
  const [updatePlayer, setUpdatePlayer] = useState(false);

  useEffect(() => {
    console.log('Updating tracklist', {
      currSong,
      playlist,
      firstCond: currSong && currSong?.uri !== playerState.current.playing?.[0],
      secCond: playlist?.length && !playerState.current.orderedPlaylilst.length
    });
    if (
      (currSong && currSong?.uri !== playerState.current.playing?.[0]) ||
      (playlist?.length && !playerState.current.orderedPlaylilst.length)
    ) {
      setUpdatePlayer(false);
      const newPlaying = currSong?.uri;
      const newOrdered = _.uniq(
        [newPlaying, ...playlist].map((song) => song.uri)
      ).filter(Boolean);
      playerState.current = {
        ...playerState.current,
        playing: newPlaying,
        orderedPlaylilst: newOrdered
      };
      setUpdatePlayer(true);
    }
  }, [currSong, playlist]);

  useEffect(() => {
    const getToken = async (code) => {
      const { data: token, status } = await axios.get(
        `${SERVICE_URL}/spotify/redirect?code=${code}`
      );
      if (status === 200) {
        playerState.current = {
          ...playerState.current,
          token,
          loading: false
        };
        updateTokenInLocalStorage(token);
      }
    };
    const refreshToken = async (savedToken) => {
      const { data: token, status } = await axios.post(
        `${SERVICE_URL}/spotify/refresh`,
        { token: savedToken }
      );
      if (status === 200) {
        playerState.current = {
          ...playerState.current,
          token: { ...playerState.current.token, ...token },
          loading: false
        };
        updateTokenInLocalStorage({ ...savedToken, ...token });
      }
    };
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage && !playerState.current.token.access_token) {
      refreshToken(JSON.parse(tokenFromLocalStorage));
      const intervalId = setInterval(() => {
        refreshToken(JSON.parse(tokenFromLocalStorage));
      }, [30000]);
      return () => clearInterval(intervalId);
    }
    if (!playerState.current.token.access_token) {
      const pathname = _.get(location, 'pathname');
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_PATHNAME, pathname);
      const code = localStorage.getItem(LOCAL_STORAGE_KEYS.CODE);
      if (code) {
        getToken(code);
        return;
      }
    }
  }, []);
  return playerState.current;
};

export default usePlayer;
