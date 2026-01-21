
import { Routes, Route, Navigate } from "react-router-dom"
import Signin from "./auth/signin/Signin"
import Signup from "./components/signup/Signup"
import Homepage from "./pages/Homepage"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

    </Routes>
  )
}
