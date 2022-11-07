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
      "BQBWUarXYNXB7ybxSXY_djE0IaEus8maxz1bnjdXx13tvYHbyqfngh3IqdTT8a14C1ki7w1bDwq04hJYtpUtD--LSRoGFlb94taYnvPKAuMePBkVaSJX4J_KvECFpSvE9VtO2e9Wwk9g8I5Nocs__Qys1x5L5wFJFkAY7uTdoG951yMbHUgCHYOcrBz1EZaQu1mOdTYyTWZAvoeMCq35",
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token:
      "AQBKdjD3btnSya4BYzwufkXM2tOMZGoYgQdXrSDVIAcCMOpUGBYGeK5jg6tLolr8vxQDhW6NQZeo-bAhpFxrErltiZfY4CMKOJx8R7ht_VDElI_nF9yTesfU_5LvAwRVAE0",
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
