import { useSelector } from "react-redux";
import { profileSelector } from "../../../state/selectors/profile";
import { slackAuth } from "../../common/utils/auth.service";
import "./Menu.scss";
import MenuItems from "./MenusItems";

const Menu = ({ className }) => {
  const profile = useSelector(profileSelector);

  const isConnected = !!profile.name;
  return (
    <div className={`Menu ${className}`}>
      {isConnected && <MenuItems className="horizontal" />}

      {isConnected ? (
        <div className="menuButton">Add Song</div>
      ) : (
        <div className="menuButton" onClick={slackAuth}>Login</div>
      )}
    </div>
  );
};

export default Menu;
