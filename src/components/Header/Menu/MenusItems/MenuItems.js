import "./MenuItems.scss";

const MenuItems = ({ className }) => {
  return (
    <div className={`MenuItems ${className}`}>
      <div className="menuItem">Create Playlist</div>
      <div className="menuItem">Stats</div>
      <div className="menuItem">About</div>
    </div>
  );
};

export default MenuItems;
