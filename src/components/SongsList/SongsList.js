import './SongsList.scss';

const SongsList = ({ className, playlistData }) => {
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

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds ?? 0;
  };

  return (
    <div className={`SongsList ${className}`}>
      <table>
        {playlistData &&
          playlistData.map(({ name, artist, image, priority, duration_ms, addedBy }, i) => {
            return (
              <tr>
                <td className='songNumber'>{i + 1}</td>
                <td>
                  <div className='songImage' style={{ backgroundImage: `url(${image})` }}></div>
                </td>
                <td className='songDetails'>
                  <div className='songName'>{name}</div>
                  <div className='songArtist'>{artist}</div>
                </td>
                <td>
                  <div
                    className='songUser'
                    title={addedBy.name}
                    style={{ backgroundImage: `url(${addedBy.avatar})` }}
                  ></div>
                </td>
                <td className='songLength'>{millisToMinutesAndSeconds(duration_ms)}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default SongsList;
