import { formatDate, getInitials } from "../utils/functions";

interface OutgoingMessageProps {
  message: string;
  username: string;
  timestamp?: Date;
}

const OutgoingMessage: React.FC<OutgoingMessageProps> = ({
  message,
  username,
  timestamp,
}) => {
  return (
    <>
      <div className="flex mb-4 cursor-pointer">
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          {username ? (
            <h1 className="text-lg text-white font-bold">
              {getInitials(username)}
            </h1>
          ) : (
            <img
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="ml-4 text-sm p-2 text-gray-600">
            {formatDate(timestamp!)}
          </span>
          <div className="flex max-w-96 bg-green-500 rounded-lg p-3 gap-3">
            <p className="text-white">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutgoingMessage;
