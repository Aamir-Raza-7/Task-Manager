import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import TaskPage from "./pages/TaskPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/SignupPage" element={<SignupPage/>}/>
        <Route path="/DashboardPage" element={<DashboardPage/>}/>
        <Route path="/SettingsPage" element={<SettingsPage/>}/>
        <Route path="/TaskPage" element={<TaskPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App