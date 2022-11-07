import Player from '../Player/Player';
import './CurrSong.scss';

const CurrSong = ({ className, playlistData }) => {
  return (
    <div className={`CurrSong ${className}`}>
      <Player playlistData={playlistData}></Player>
      <div className='CurrSongContent'>
        <div className='CurrSongImageAndDetails'>
          <div className='CurrSongImage'></div>
          <div className='CurrSongDetails'>
            <div className='CurrSongName'>Duck Duck Goose</div>
            <div className='CurrSongArtist'>CupcakKe</div>
            <div className='CurrSongRating'>
              <div className='mid-gray'></div>
              <div className='CurrSongUser'></div>
              <div className='CurrSongAddedBy'>Added by: Tomer</div>
            </div>
          </div>
        </div>
        <div className='progressBar'>
          <div className='progressBarFill' style={{ width: '10%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CurrSong;
