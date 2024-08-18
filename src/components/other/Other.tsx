import { formatDate } from "../utils/functions";

interface OtherMessageProps {
  message: string;
  username: string;
  timestamp?: Date;
}

const OtherMessage: React.FC<OtherMessageProps> = ({
  message,
  timestamp,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <span className="ml-4 text-sm p-4 text-gray-600">
          {formatDate(timestamp!)}
        </span>
        <div className="flex max-w-60 bg-gray-500 rounded-lg p-2 gap-3">
          <p className="text-white text-sm">{message}</p>
        </div>
      </div>
    </>
  );
};

export default OtherMessage;