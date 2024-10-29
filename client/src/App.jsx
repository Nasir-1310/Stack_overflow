import { useState } from "react";
import Auth from "./components/Auth"
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";
import NotificationList from "./components/NotificationList";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Link} from "react-router-dom"

function App() {
  const [token, setToken] = useState(null); // Token for authenticated user
   // To toggle between posts and notifications

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
  <BrowserRouter>
    {!token ? (
      <Auth setToken={setToken} />
    ) : (
      <div className="container mx-auto bg-white p-6 shadow-lg rounded-lg">
        <header className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Stack Overflow Mini Version
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/notifications"
              className="text-white bg-gray-800 hover:bg-yellow-500 transition-colors duration-200 py-2 px-4 rounded-md"
            >
              Notifications
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-red-500 transition-colors duration-200 text-white py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<PostList token={token} />} />
          <Route path="/post/:postId" element={<SinglePost token={token} />} />
          <Route path="/notifications" element={<NotificationList token={token} />} />
        </Routes>
      </div>
    )}
  </BrowserRouter>
</div>

  )
}

export default App
