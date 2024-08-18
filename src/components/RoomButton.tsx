import React from "react";
import { getInitials, getMember } from "./utils/functions";

interface RoomInterface {
  image?: string;
  name: string;
  followers?: number;
  onClick(): any;
}
const RoomButton: React.FC<RoomInterface> = ({
  image,
  name,
  followers,
  onClick,
}) => {
  
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none"
    >
      {image ? (
        <img className="object-cover w-8 h-8 rounded-full" src={image} alt="" />
      ) : (
        <div className="bg-gray-700 rounded-full w-8 h-8 p-5 flex justify-center items-center ">
          <h1 className="text-lg text-white font-bold">{getInitials(name)}</h1>
        </div>
      )}

      <div className="text-left rtl:text-right">
        <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
          {name}
        </h1>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {getMember(followers!)}
        </p>
      </div>
    </button>
  );
};

export default RoomButton;
