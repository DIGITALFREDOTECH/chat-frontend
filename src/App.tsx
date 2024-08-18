import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ChatRoom from "./components/ChatRoom";
// import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat-rooms/:roomId" element={<ChatRoom />} />
        <Route path="/chat-rooms" element={<ChatRoom />} />
        {/* <Route path="/chat/:roomId" element={<Chat />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
