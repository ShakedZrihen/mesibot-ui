import "./Playlist.scss";
import CurrSong from "../CurrSong";
import SongsList from "../SongsList";
import Chat from "../Chat";
import { useState } from "react";

const Playlist = ({ className }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className={`Playlist ${className}`}>
      <main>
        <div className="CurrSongWrapper">
          <CurrSong />
        </div>
        <div className="SongsListWrapper">
          <SongsList />
        </div>
      </main>
      <aside className={`responsive ${isChatOpen ? "open" : "close"}`}>
        <Chat setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      </aside>
    </div>
  );
};

export default Playlist;
