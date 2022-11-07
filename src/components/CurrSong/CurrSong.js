import Player from '../Player/Player';
import './CurrSong.scss';

const CurrSong = ({ className }) => {
  return (
    <div className={`CurrSong ${className}`}>
      <Player></Player>
    </div>
  );
};

export default CurrSong;
