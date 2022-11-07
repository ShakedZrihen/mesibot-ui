import { useState } from "react";
import "./Header.scss";
import Menu from "./Menu";
import MenuItems from "./Menu/MenusItems";

const Header = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`Header ${className}`}>
      <div
        className="hamburger-icon"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <MenuItems className={`vertical ${isMenuOpen ? "open" : "close"}`} />
      </div>
      <div className="logo"></div>
      <nav>
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
