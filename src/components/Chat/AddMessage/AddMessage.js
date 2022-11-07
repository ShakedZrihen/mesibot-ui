import "./AddMessage.scss";

const AddMessage = ({ className, setIsChatOpen, isChatOpen }) => {
  return (
    <div className={`AddMessage ${className}`}>
      <input placeholder="Add message"></input>
      <div
        className="toggleMessages"
        onClick={() => setIsChatOpen(!isChatOpen)}
      ></div>
    </div>
  );
};

export default AddMessage;
