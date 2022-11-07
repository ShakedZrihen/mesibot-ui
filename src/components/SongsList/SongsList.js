import "./SongsList.scss";

const SongsList = ({ className, playlistData }) => {
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds ?? 0;
  };

  return (
    <div className={`SongsList ${className}`}>
      <table>
        <tbody>
          {playlistData &&
            playlistData.map(
              ({ name, artist, image, priority, duration_ms, addedBy }, i) => {
                return (
                  <tr key={name}>
                    <td className="songNumber">{i + 1}</td>
                    <td className="songImageCell">
                      <div
                        className="songImage"
                        style={{ backgroundImage: `url(${image})` }}
                      ></div>
                    </td>
                    <td className="songDetails">
                      <div className="songName">{name}</div>
                      <div className="songArtist">{artist}</div>
                    </td>
                    <td className="songUserCell">
                      <div
                        className="songUser"
                        title={addedBy.name}
                        style={{ backgroundImage: `url(${addedBy.avatar})` }}
                      ></div>
                    </td>
                    <td className="songLength">
                      {millisToMinutesAndSeconds(duration_ms)}
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};

export default SongsList;
