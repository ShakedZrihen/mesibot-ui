import SpotifyPlayer from "react-spotify-web-playback";
import axios from "axios";
import { useEffect, useState } from "react";

const getTokenFromStorage = () => {
  const { spotifyToken } = localStorage.getItem("spotifyToken");
  console.log("spotifyToken: ", spotifyToken);
  return spotifyToken ? JSON.parse(spotifyToken) : "";
};

const Player = ({ playlistData }) => {
  const [token, setToken] = useState({
    access_token:
      "BQDIld6kkdeBqt3MC8M71BueUZL4NNAz4mMtePTww-JIQey7eainycO0X0jy_BFKQfojt0-EZyni9X5-SW-CbN4rBg31ke7kNY1d2sbc8zB-Y_p6-Ituoh7abKBPfBcgMjOsIqYPrHcWluHqu5fZfiEZcmKnkd-2x0IbwjpzseHSuMTCF_7yu3VOhFEjlcQl9xHGRa-223l4CVuUjG6D",
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token:
      "AQCt22lEZrWyi9heriCoF0vOt96Gu2PTdYIXhYJCawZ-LC66fnh3EQJ5nnjGRT0_VSLlGT5D_ll4CK6PKOFtah7kfFqKcFLPr74X0IC8y4b0GeIy81CIVZmqPF6a72nmr4k",
    scope:
      "streaming user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-email user-read-private user-top-read",
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     const refresh = async () => {
  //       console.log("refreshing...");
  //       const res = await axios
  //         .post("https://mesibot.ngrok.io/spotify/refresh", {
  //           token,
  //         })
  //         .catch((e) => console.log({ e }));
  //       console.log({ res });
  //       setToken({ ...res.data, refresh_token: token.refresh_token });
  //       localStorage.setItem(
  //         "spotifyToken",
  //         JSON.stringify({ ...res.data, refresh_token: token.refresh_token })
  //       );
  //     };
  //     refresh();
  //   }, 200000);
  // }, [token.access_token]);

  const tracks = playlistData?.map(({ uri }) => uri);
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
