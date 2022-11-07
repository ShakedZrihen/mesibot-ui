import "./Messages.scss";
import _ from "lodash";
import Message from "./Message";
import { useSelector } from "react-redux";
import { chatMessagesSelector } from "../../../state/selectors/chat";
import { useEffect, useState } from "react";

const ColorPicker = () => {
  const colors = [
    "purple",
    "blue",
    "orange",
    "turquoise",
    "purple",
    "red",
    "light-pink",
    "light-yellow",
    "light-gray",
    "light-green",
    "peach",
    "lilach",
    "light-purple",
    "grad-blue-1",
    "grad-blue-2",
    "grad-blue-3",
    "grad-pink-1",
    "grad-pink-2",
    "grad-pink-3",
    "grad-orange-1",
    "grad-orange-2",
    "grad-orange-3",
    "grad-purple-1",
    "grad-purple-2",
    "grad-purple-3",
  ];

  const authorsColors = {};
  return {
    getColorByAuthor: (author) => {
      if (!authorsColors[author]) authorsColors[author] = _.sample(colors);
      return authorsColors[author];
    },
  };
};

const Messages = ({ className }) => {
  const messages = useSelector(chatMessagesSelector);
  const [colorPicker, setColorPicker] = useState(ColorPicker());
  useEffect(() => {
    setColorPicker(ColorPicker());
  }, []);
  // const messages = [
  //   { author: "Oriel", message: "שניצל פקטורי?", color: "blue" },
  //   {
  //     author: "Shani",
  //     message: "יום ראשון זה יום לפסטה, שניצל זה מחר",
  //     color: "purple",
  //   },
  //   { author: "Fadi", message: "love this one!", color: "orange" },
  //   { author: "Keren", message: "?אולי חמוצי", color: "turquoise" },
  //   {
  //     author: "Ori",
  //     message: "Who added  this crap song?",
  //     color: "light-purple",
  //   },
  //   { author: "Avishag", message: "!!!!איזה שיר", color: "red" },
  // ];

  return (
    <div className={`Messages ${className}`}>
      {messages.map(({ author, content, sentAt }) => {
        const color = colorPicker.getColorByAuthor(author);
        return (
          <Message className={color} key={sentAt}>
            <div>{author}:</div>
            <div>{content}</div>
          </Message>
        );
      })}
    </div>
  );
};

export default Messages;
