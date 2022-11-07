import { useState } from 'react';
import _ from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ currSong, playlist }) => {
  const [token, setToken] = useState({ "access_token": "BQB7yYzvW-4OUydC6FhuYdWLGTo8jHjN0iRlkNeIcETjbQGEbgp4b6gIupVMRpmzhN3Y2m8ae5vOut0VaAqZiEFG2UURTybrk9Z0u8gxOggAEVTdQrsJPyK7L9mnsOd2zgc_t3A_Wrw1yxSfHBmvXrjZLOeGccKKv6qb9IImFbSO8zMcEqJhxuF7mx7AePDe2BU6KyYhzZMQLnQstAtaW-znc34utsnMjzYx", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "AQCoPaZOd55XDwGNAyKP5GK6ULkYRYgEFiASzxWY4NvsoSVe4XQ_8rNDXdK2dqbs8LwmkYznpYSzXpUp5LOpmDLOW4bHLpVC3TkmpJL8OVZmNmy3j1bkq4mWewoN_Qsjmr0", "scope": "streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read" });
  const currSongUri = _.get(currSong, 'uri');
  console.log({ currSong, currSongUri });

  const tracks = [currSongUri, ...playlist.map(song => song.uri)];
  console.log('flom', { tracks });
  return (
    <div>
      <SpotifyPlayer
        styles={{
          activeColor: "white",
          bgColor: "unset",
          color: "white",
          loaderColor: "#fff",
          sliderColor: "#17E1BD",
          sliderTrackColor: "#61656C",
          sliderHandleColor: "#61656C",
          trackArtistColor: "white",
          trackNameColor: "white",
        }}
        token={token.access_token}
        uris={tracks}
      />
    </div>
  );
};

export default Player;
