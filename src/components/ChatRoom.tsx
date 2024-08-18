// import React from 'react';
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

import ChatList from "./other/ChatList";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

import IncomingMessage from "./other/InMessage";
import OutgoingMessage from "./other/outMessage";
import { formatDate, getInitials, getMember } from "./utils/functions";
import RoomButton from "./RoomButton";

export type Message = {
  key: string;
  name: string;
  email: string;
  message: string;
  timestamp?: Date; // Optional timestamp for messages
};
const names = [
  "James Doe",
  "Alice Smith",
  "John Williams",
  "Mary Johnson",
  "David Miller",
  "Ebso Joseph",
];
const emails = names.map(
  (name) => `${name.replace(" ", "").toLowerCase()}@gmail.com`
);

function getRandomMessage(name: string, email: string): Message {
  const messages = [
    "Hey everyone!",
    "What's up?",
    "How's your day going?",
    "Just checking in...",
    "Anyone up for lunch?",
    "Did you see that movie?",
    "Got any weekend plans?",
    "Just finished a project, yay!",
    "Feeling grateful today!",
    "Anyone else having coffee cravings?",
    "Need some help with this task...",
    "Found this funny meme!",
    "Wishing you all a great day!",
    "Looking forward to the weekend!",
    "Have a good night everyone!",
    "See you all tomorrow!",
    "Anyone free for a chat?",
    "Just a random thought...",
    "Let's celebrate!",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return {
    name,
    email,
    message: randomMessage,
    timestamp: new Date(),
    key: "",
  }; // Add timestamp
}

const conversations: Message[] = [];
for (let i = 0; i < 20; i++) {
  const randomSenderIndex = Math.floor(Math.random() * names.length);
  const message = getRandomMessage(
    names[randomSenderIndex],
    emails[randomSenderIndex]
  );
  message.key = i.toString();
  conversations.push(message);
}

function ChatRoom() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomImage, setRoomImage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")!));
  const [rooms, setRooms]: any = useState([]);
  const [messages, setMessages]: any [] = useState([]);
  const [message, setMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState({
    name: "Sports Fans ",
    image_url: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    userCount: 1,
    _id: "hashhvdvskhdvgkh",
  });
  const navigate = useNavigate();

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  const logout = () => {
    navigate("/login");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "post",
      body: JSON.stringify({
        name: roomName,
        image_url: roomImage,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      const newRooms = [
        ...rooms,
        {
          name: json.name,
          image: json.image_url,
          key: json._id,
          userCount: json.userCOunt,
        },
      ];
      setRooms(newRooms);
      console.log({ name: json.name, key: json._id });
    } else {
    }
  };

  const handleMessageSent = (e: any) => {
    e.preventDefault();
    const data = JSON.stringify({
      message: message,
      userId: user._id,
      email: user.email,
      timestamp: new Date(),
      roomId: currentRoom._id!,
    });
    // console.log(data);
    setMessage("");
    socket.emit("send_message", data);
    // console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/joined", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setRooms(json);
      }
    };

    fetchData();

    socket.on("receive_message", (data: string) => {
      console.log(data);

      const dataMessage = JSON.parse(data);
      if (dataMessage.roomId === currentRoom._id) {
        console.log("this is the chat id");
        const newMessages = {
          timestamp: new Date(dataMessage.timestamp),
          message: dataMessage.message,
          username: dataMessage.email,
          key: dataMessage.key,
        };
        console.log(messages);
        setMessages([...message, newMessages]);
        console.log(messages)
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <form onSubmit={handleCreateRoom}>
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create New Chat Room
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Romm Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="room_image_url" value="Room Image Url" />
                </div>
                <TextInput
                  id="image_url"
                  type="image_url"
                  value={roomImage}
                  onChange={(event) => setRoomImage(event.target.value)}
                  required
                />
              </div>

              <div className="w-full flex justify-center">
                <Button className="w-7/12" type="submit">
                  Create Room
                </Button>
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
      <div className="flex h-screen">
        <div className="w-1/4">
          <aside className="flex">
            <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
              <h2 className="px-5 text-lg font-bold text-blue-300 dark:text-white">
                Chat Room
              </h2>
              <Button className="m-4" onClick={() => setOpenModal(true)}>
                Create New Room
              </Button>

              <div className="mt-8 space-y-4 h-8/12 overflow-scroll">
                {rooms.map((room: any) => (
                  <RoomButton
                    key={room._id}
                    name={room.name}
                    image={room.image}
                    followers={room.userCount}
                    onClick={function () {
                      setCurrentRoom(room);
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
        <div className="flex-1 mb-24">
          <Navbar fluid rounded>
            <div className="flex items-center justify-center">
              {currentRoom.image_url ? (
                <>
                  <Avatar
                    className="mr-4"
                    alt="User settings"
                    img={currentRoom.image_url}
                    rounded
                  />
                </>
              ) : (
                <div className="bg-gray-700 rounded-full w-8 h-8 p-5 m-2 flex justify-center items-center ">
                  <h1 className="text-lg text-white font-bold">
                    {getInitials(currentRoom.name)}
                  </h1>
                </div>
              )}

              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold">{currentRoom.name}</h1>
                <span className="text-xs text-gray-500">
                  {getMember(currentRoom.userCount)}
                </span>
              </div>
            </div>
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-md font-bold">
                    {user.full_name}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>

                <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse></Navbar.Collapse>
          </Navbar>
          <div className="h-screen overflow-y-auto p-4 pb-36 mb-20">
            <ChatList email={user.email} messages={messages} />

            <div className="flex flex-col">
              <span className="ml-4 text-sm p-4 text-gray-600">
                {formatDate(new Date())}
              </span>
              <div className="flex max-w-60 bg-gray-500 rounded-lg p-2 gap-3">
                <p className="text-white text-sm">James left</p>
              </div>
            </div>
          </div>

          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <form className="flex items-center" onSubmit={handleMessageSent}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
