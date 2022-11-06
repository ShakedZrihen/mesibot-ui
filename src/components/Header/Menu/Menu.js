import { useSelector } from "react-redux";
import { PROFILE_STATES } from "../../../state/reducers/profile";
import { profileSelector } from "../../../state/selectors/profile";
import { slackAuth } from "../../common/utils/auth.service";
import "./Menu.scss";
import MenuItems from "./MenusItems";

const Menu = ({ className }) => {
  const profile = useSelector(profileSelector);

  return (
    <div className={`Menu ${className}`}>
      <MenuItems className="horizontal" />

      {profile === PROFILE_STATES.NOT_AUTH ? (
        <div className="menuButton" onClick={slackAuth}>Login</div>
      ) : (
        <div className="menuButton">Add Song</div>
      )}
    </div>
  );
};

export default Menu;
