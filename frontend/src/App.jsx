import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
