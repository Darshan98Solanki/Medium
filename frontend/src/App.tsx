import { BrowserRouter, Route, Routes } from "react-router-dom"
import SingUp from "./pages/Signup"
import SingIn from "./pages/SignIn"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Publish from "./components/Publish"
import ProfileBlog from "./pages/ProfileBlog"
import Profile from "./pages/Profile"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SingIn />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/edit/:id" element={<Publish />} />
          <Route path="/profile/logs" element={<ProfileBlog />} />
          <Route path="/profile/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
