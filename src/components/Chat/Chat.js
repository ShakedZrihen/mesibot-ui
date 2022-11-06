import "./Chat.scss";
import Messages from "./Messages";
import AddMessage from "./AddMessage";

const Chat = ({ className }) => {
  return (
    <div className={`Chat ${className}`}>
      <Messages />
      <AddMessage />
    </div>
  );
};

export default Chat;
