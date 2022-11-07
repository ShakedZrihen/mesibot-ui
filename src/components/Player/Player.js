import { useState } from "react";
import _ from "lodash";
import SpotifyPlayer from "react-spotify-web-playback";
import { useDispatch } from "react-redux";
import { currSongStarted } from "../../state/actions/playlist";

const Player = ({ playlist }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState({
    access_token:
      "BQAWdi7VJsfiZIAK09r0oPhnW5BTpPRJeZLohErME0gEa9c9Frm3IDA5bY69a40LWTUQRYHMP9XxgWevpe6sYG0d2UY-iEO-cPFCg-TUJVg6VWyNkVuJwdhqexv-qtYrsbW1jsv2l6bhAqf9y0cumv9KE-2pOXG4q210XR48A3W6oLRQOsgvP-TmJTOWPOCZUTk18dNP5ZEICmYEf79aUqoZjG7Q3zcsUHd9",
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token:
      "AQBkRmeUBcfewRDCQ32lhyRDi82OoSlb_6HrZFtrTJ4fB9Qkb81XvU0FElrZGOeDnnSmrb146HIyDr3sSSIlZOX3M3EgKPPsWtxxdRs0EJACNBz9oAZpJsuxB1vycBnYl9Y",
    scope:
      "streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read",
  });
  // console.log({ playlist });
  const tracks = playlist.map((song) => song.uri);

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
        callback={(state) => {
          const type = _.get(state, 'type');
          const progressMs = _.get(state, 'progressMs');
          if (type === 'track_update' && progressMs === 0) {
            console.log('song-started', { type });
            currSongStarted()(dispatch);
          }
        }}
      />
    </div>
  );
};

export default Player;
