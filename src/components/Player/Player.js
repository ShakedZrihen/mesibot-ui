import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
  return (
    <div>
      <SpotifyPlayer
        styles={{
          activeColor: '#fff',
          bgColor: '#222326',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff'
        }}
        token='BQDJ_3AzxSOMgDDzJ77jnfZr2bLG8fPF1-wQ9NpklwschQlYghwyueAsI-cWEH9E7GhTTft6YjhLiHvljFw_xAh0frQw0YKtDF11Rfpoa23-P6bpaYQ2TXUltjdjcV1M87RnRL9-GNBF66WiL1KeN5PL_CfbqJEno3PhTruxJWthgRkKDHyus0HYTV1bwhRe60tGFHzTfr4xNkUo144yOC1VscmjvQq95HLi'
        uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
      />
      ;
    </div>
  );
};

export default Player;
