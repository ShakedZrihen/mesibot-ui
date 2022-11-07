import Player from "../Player/Player";
import "./CurrSong.scss";

const CurrSong = ({ className, currSong, playlist }) => {
  return (
    <div className={`CurrSong ${className}`}>

      <div className="CurrSongContent">
        <Player currSong={currSong} playlist={playlist}></Player>
      </div>
    </div>
  );
};

export default CurrSong;
