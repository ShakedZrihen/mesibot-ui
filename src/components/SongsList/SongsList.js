import './SongsList.scss';

const SongsList = ({ className, playlistData }) => {
  return (
    <div className={`SongsList ${className}`}>
      <table>
        <tbody>
          {playlistData &&
            playlistData.map(
              ({ name, artist, image, priority, length = "3:13" }, i) => {
                return (
                  <tr key={name}>
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
        </tbody>
      </table>
    </div>
  );
};

export default SongsList;
