import "./Header.scss";
import Menu from "./Menu";
import MenuItems from "./Menu/MenusItems";

const Header = ({ className }) => {
  return (
    <div className={`Header ${className}`}>
      <div className="hamburger-icon">
        {/* <MenuItems className="vertical" /> */}
      </div>
      <div className="logo"></div>
      <nav>
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
