import SpotifyPlayer from "react-spotify-web-playback";

const Player = () => {
  return (
    <div>
      <SpotifyPlayer
        styles={{
          activeColor: "white",
          bgColor: "unset",
          color: "white",
          loaderColor: "#fff",
          sliderColor: "#17E1BD",
          sliderTrackColor: "#61656C",
          sliderHandleColor: "#61656C",
          trackArtistColor: "white",
          trackNameColor: "white",
        }}
        token="BQDwdtYL0k19lcgm9FJW4TcYk51NMgjyfPFzqvg63IyahjTjmuR4o1bP3zVJ6pL8XjOq-xFSk8AXn8PuC87L6N4Jk4wNdF-QY41ZtBPgD9JsDY_qASEJL9Pf8SPf2cskxcD19tLL4GbKv7JOkVuLoljJ-2iEbLqWh-_MPp1jlm-A9Rk4HbCECjkzJB0rWOhXT89CRaGDpkwc_GaLiIIM"
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      />
    </div>
  );
};

export default Player;
