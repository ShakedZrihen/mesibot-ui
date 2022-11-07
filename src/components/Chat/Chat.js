import "./Chat.scss";
import Messages from "./Messages";
import AddMessage from "./AddMessage";

const Chat = ({ className, setIsChatOpen, isChatOpen }) => {
  return (
    <div className={`Chat ${className}`}>
      <Messages />
      <AddMessage setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
    </div>
  );
};

export default Chat;
