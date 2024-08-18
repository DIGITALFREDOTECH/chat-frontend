import { formatDate } from "../utils/functions";

interface IncomingMessageProps {
  message: string;
  username: string;
  timestamp?: Date;
}

const IncomingMessage: React.FC<IncomingMessageProps> = ({
  message,
  username,
  timestamp,
}) => {
  return (
    <>
      <div className="flex justify-end mb-4 cursor-pointer">
        <div className="flex flex-col">
          <span className="ml-4 text-sm p-2 text-gray-600">
            {formatDate(timestamp!)}
          </span>
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>{message}</p>
          </div>
        </div>

        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default IncomingMessage;
