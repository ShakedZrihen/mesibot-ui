import { useEffect } from "react";
import Player from "../Player/Player";
import "./CurrSong.scss";

const CurrSong = ({ className, playlist }) => {
  return (
    <div className={`CurrSong ${className}`}>

      <div className="CurrSongContent">
        <Player playlist={playlist}></Player>
      </div>
    </div>
  );
};

export default CurrSong;
