import './Playlist.scss';
import CurrSong from '../CurrSong';
import SongsList from '../SongsList';
import Chat from '../Chat';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getPlaylist = async () => axios.get('https://mesibot.ngrok.io/spotify/playlist/C049M53M0GM');

const Playlist = ({ className }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [playlist, setPlaylist] = useState({});
  const getPlaylistBlah = async () => {
    const playlist = await getPlaylist();
    setPlaylist(playlist);
  };

  useEffect(() => {
    getPlaylistBlah();
  }, []);

  const playlistData = playlist.data;
  
  return (
    <div className={`Playlist ${className}`}>
      <main>
        <div className='CurrSongWrapper'>
          <CurrSong playlistData={playlistData} />
        </div>
        <div className='SongsListWrapper'>
          <SongsList playlistData={playlistData}/>
        </div>
      </main>
      <aside className={`responsive ${isChatOpen ? 'open' : 'close'}`}>
        <Chat setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      </aside>
    </div>
  );
};

export default Playlist;
