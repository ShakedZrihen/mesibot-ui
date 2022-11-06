import "./AddMessage.scss";

const AddMessage = ({ className }) => {
  return (
    <div className={`AddMessage ${className}`}>
      <input placeholder="Add message"></input>
    </div>
  );
};

export default AddMessage;
