import { useSelector } from "react-redux";
import { profileSelector } from "../../../state/selectors/profile";
import "./Menu.scss";
import MenuItems from "./MenusItems";

const Menu = ({ className }) => {
  const profile = useSelector(profileSelector);

  return (
    <div className={`Menu ${className}`}>
      <MenuItems className="horizontal" />

      <div className="menu-button">Add Song</div>
    </div>
  );
};

export default Menu;
