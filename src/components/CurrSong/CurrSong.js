import Player from "../Player/Player";
import "./CurrSong.scss";

const CurrSong = ({ className }) => {
  return (
    <div className={`CurrSong ${className}`}>
      <div className="CurrSongContent">
        <Player />
      </div>
    </div>
  );
};

export default CurrSong;
