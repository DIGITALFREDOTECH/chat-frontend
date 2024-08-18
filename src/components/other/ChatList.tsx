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
  //   console.log(messages);
  return (
    <>
      {messages.map((message) => {
        if (!message.event) {
          if (message.email === email) {
            return (
              <OutgoingMessage
                timestamp={message.timestamp}
                message={message.message}
                username={message.name}
                key={message.key}
              />
            );
          } else {
            return (
              <IncomingMessage
                key={message.key}
                timestamp={message.timestamp}
                message={message.message}
                username={message.name}
              />
            );
          }
        } else {
          return (
            <OtherMessage
              key={message.key}
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
