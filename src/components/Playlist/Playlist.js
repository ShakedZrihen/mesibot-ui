import './Playlist.scss';
import _ from 'lodash';
import CurrSong from '../CurrSong';
import SongsList from '../SongsList';
import Chat from '../Chat';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playlistSelector } from '../../state/selectors/playlist';
import { fetchPlaylist } from '../../state/actions/playlist';

const Playlist = ({ className }) => {
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  // const [currSong, setCurrSong] = useState();
  const playlist = useSelector(playlistSelector);

  // const firstSong = _.get(playlist, '[0]');

  useEffect(() => {
    fetchPlaylist()(dispatch)
  }, [dispatch]);

  // useEffect(() => {
  //   setCurrSong(firstSong);
  // }, [firstSong])

  return (
    <div className={`Playlist ${className}`}>
      <main>
        <div className='CurrSongWrapper'>
          <CurrSong playlist={playlist} />
        </div>
        <div className='SongsListWrapper'>
          <SongsList playlistData={playlist} />
        </div>
      </main>
      <aside className={`responsive ${isChatOpen ? "open" : "close"}`}>
        <Chat setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      </aside>
    </div>
  );
};

export default Playlist;
