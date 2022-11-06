import Login from "../components/Login/Login";
import PlaylistView from "../../src/components/Playlist";

const NotFound = () => <div>not found</div>;
const Playlist = () => <PlaylistView />;
const Stats = () => <div>Stats</div>;

const ROUTES_MODEL = {
  LOGIN: { path: "/login", component: Login },
  PLAYLIST: {
    path: "/playlist/:playlistId",
    component: Playlist,
    isAuth: true
  },
  STATS: { path: "/stats", component: Stats, isAuth: true },
  NOT_FOUND: { path: "*", component: NotFound, isAuth: true },
};

export default ROUTES_MODEL;
