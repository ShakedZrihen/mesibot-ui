import "./SongsList.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const getPlaylist = async () =>
  axios.get("https://mesibot.ngrok.io/spotify/playlist/C049M53M0GM");

const SongsList = ({ className }) => {
  const [playlist, setPlaylist] = useState({});
  const getPlaylistBlah = async () => {
    const playlist = await getPlaylist();
    setPlaylist(playlist);
  };

  useEffect(() => {
    getPlaylistBlah();
  }, []);

  const playlistData = playlist.data;

  // const playlist1 = {
  //   data: [
  //     {
  //       name: "Rain On Me (with Ariana Grande)",
  //       artist: "Lady Gaga",
  //       uri: "spotify:track:7ju97lgwC2rKQ6wwsf9no9",
  //       image:
  //         "https://i.scdn.co/image/ab67616d0000b2736040effba89b9b00a6f6743a",
  //       priority: 1,
  //     },
  //     {
  //       name: "Lady Madonna",
  //       artist: "The Beatles",
  //       uri: "spotify:track:5l1eg7A2S6PtlIbo3Ms4dl",
  //       image:
  //         "https://i.scdn.co/image/ab67616d0000b27330503dbc30e621c96913379b",
  //       priority: 0,
  //     },
  //   ],
  //   status: 200,
  //   statusText: "",
  //   headers: {
  //     "cache-control": "no-cache",
  //     "content-length": "378",
  //     "content-type": "application/json; charset=utf-8",
  //   },
  //   config: {
  //     transitional: {
  //       silentJSONParsing: true,
  //       forcedJSONParsing: true,
  //       clarifyTimeoutError: false,
  //     },
  //     transformRequest: [null],
  //     transformResponse: [null],
  //     timeout: 0,
  //     xsrfCookieName: "XSRF-TOKEN",
  //     xsrfHeaderName: "X-XSRF-TOKEN",
  //     maxContentLength: -1,
  //     maxBodyLength: -1,
  //     env: {},
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //     },
  //     method: "get",
  //     url: "https://mesibot.ngrok.io/spotify/playlist/C049M53M0GM",
  //   },
  //   request: {},
  // };

  return (
    <div className={`SongsList ${className}`}>
      <table>
        {playlistData &&
          playlistData.map(
            ({ name, artist, image, priority, length = "3:13" }, i) => {
              return (
                <tr>
                  <td className="songNumber">{i + 1}</td>
                  <td>
                    <div
                      className="songImage"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </td>
                  <td className="songDetails">
                    <div className="songName">{name}</div>
                    <div className="songArtist">{artist}</div>
                  </td>
                  <td>
                    <div className="songUser"></div>
                  </td>
                  <td className="songLength">{length}</td>
                </tr>
              );
            }
          )}
      </table>
    </div>
  );
};

export default SongsList;
