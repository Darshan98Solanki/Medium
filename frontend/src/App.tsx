import { BrowserRouter, Route, Routes } from "react-router-dom"
import SingUp from "./pages/Signup"
import SingIn from "./pages/SignIn"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SingIn/>}/>
          <Route path="/signup" element={<SingUp/>}/>
          <Route path="/signin" element={<SingIn/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
