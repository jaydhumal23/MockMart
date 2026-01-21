
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom"
import Signin from "./auth/signin/Signin"
import Signup from "./components/signup/Signup"
import Homepage from "./pages/Homepage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>

  )
}
