export const playlistSelector = (state) =>
  state.playlist || { songs: [], currSong: null };
