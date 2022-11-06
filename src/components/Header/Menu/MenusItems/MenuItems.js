import "./MenuItems.scss";

const MenuItems = ({ className }) => {
  return (
    <div className={`MenuItems ${className}`}>
      <div className="menu-item">Create Playlist</div>
      <div className="menu-item">Stats</div>
      <div className="menu-item">About</div>
    </div>
  );
};

export default MenuItems;
