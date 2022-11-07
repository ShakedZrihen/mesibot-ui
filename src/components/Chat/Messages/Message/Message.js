import "./Message.scss";

const Message = ({ className, children }) => {
  return <div className={`Message ${className}`}>{children}</div>;
};

export default Message;
