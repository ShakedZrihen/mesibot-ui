import { useState } from "react";
import { sendNewMessage } from "../chat.service";
import "./AddMessage.scss";

const AddMessage = ({ className, setIsChatOpen, isChatOpen }) => {
  const [message, setMessage] = useState("");

  const clearMessage = () => setMessage("");

  const onKeyDown = async (e) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      sendNewMessage(value);
      clearMessage();
    }
  };
  return (
    <div className={`AddMessage ${className}`}>
      <input
        value={message}
        placeholder="Add message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
      ></input>
      <div
        className="toggleMessages"
        onClick={() => setIsChatOpen(!isChatOpen)}
      ></div>
    </div>
  );
};

export default AddMessage;
