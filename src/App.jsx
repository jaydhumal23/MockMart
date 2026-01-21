
import { Routes, Route, Navigate } from "react-router-dom"
import Signin from "./auth/signin/Signin"
import Signup from "./auth/signup/Signup"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />

    </Routes>
  )
}
