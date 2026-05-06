import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import { PostMain } from "./pages/PostFeed"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/postfeed" element={<PostMain />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
