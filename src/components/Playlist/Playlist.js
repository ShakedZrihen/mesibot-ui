import "./Playlist.scss";
import CurrSong from "../CurrSong";
import SongsList from "../SongsList";
import Chat from "../Chat";

const Playlist = ({ className }) => {
  return (
    <div className={`Playlist ${className}`}>
      <main>
        <CurrSong />
        <SongsList />
      </main>
      <aside className="responsive">
        <Chat />
      </aside>
    </div>
  );
};

export default Playlist;
