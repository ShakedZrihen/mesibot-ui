import "./Messages.scss";
import Message from "./Message";

const Messages = ({ className }) => {
  const messages = [
    { author: "Oriel", message: "שניצל פקטורי?", color: "blue" },
    {
      author: "Shani",
      message: "יום ראשון זה יום לפסטה, שניצל זה מחר",
      color: "purple",
    },
    { author: "Fadi", message: "love this one!", color: "orange" },
    { author: "Keren", message: "?אולי חמוצי", color: "turquoise" },
    {
      author: "Ori",
      message: "Who added  this crap song?",
      color: "light-purple",
    },
    { author: "Avishag", message: "!!!!איזה שיר", color: "red" },
  ];

  return (
    <div className={`Messages ${className}`}>
      {messages.map(({ author, message, color }) => {
        return (
          <Message className={color}>
            <div>{author}:</div>
            <div>{message}</div>
          </Message>
        );
      })}
    </div>
  );
};

export default Messages;
