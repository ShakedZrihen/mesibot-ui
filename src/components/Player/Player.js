import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
  return (
    <div>
      <SpotifyPlayer
        token='BQCqpQdvS1QSt5BUiLXtwANruQZMxgjAEO5IxZky99OELX-1j-ohLLvAwlBaXVSmssG7kya_MsdAkLdrKIk186-PnCbM2sbrEbQkgL5STjXYtX4nMF1wqQB6j7M25myNZtObtmDnXlPIk7800KYrMfI0WiP64bpNuZ0whJ6a34dFoMLKKoyOR-M42WzG8TB1gSM6ki40K-p3aqVm5Rg7WH-1S9ob7E6wmdYJ'
        uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
      />
      ;
    </div>
  );
};

export default Player;
