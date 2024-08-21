import IncomingMessage from "./InMessage";
import OutgoingMessage from "./outMessage";
import { Message } from "../ChatRoom";
import OtherMessage from "./Other";

// console.log(conversations);
interface Chats {
  messages: Message[];
  email: string;
}

const ChatList: React.FC<Chats> = ({ messages, email }) => {
  // console.log(email);
  return (
    <>
      {messages.map((message, index) => {
        if (!message.event) {
          if (message.email === email) {
            return (
              <IncomingMessage
                key={index}
                timestamp={message.timestamp}
                message={message.message}
                username={message.name}
              />
            );
          } else {
            return (
              <OutgoingMessage
                timestamp={message.timestamp}
                message={message.message}
                username={message.name}
                key={index}
              />
            );
          }
        } else {
          return (
            <OtherMessage
              key={index}
              timestamp={message.timestamp}
              message={message.message}
              username={message.name}
            />
          );
        }
      })}
    </>
  );
};

export default ChatList;
