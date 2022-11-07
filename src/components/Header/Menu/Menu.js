import { useSelector } from "react-redux";
import { slackAuth } from "../../../common/utils/auth.service";
import { profileSelector } from "../../../state/selectors/profile";

import "./Menu.scss";
import MenuItems from "./MenusItems";

const Menu = ({ className }) => {
  const profile = useSelector(profileSelector);

  const isConnected = !!profile.email;
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
