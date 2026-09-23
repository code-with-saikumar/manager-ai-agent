import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Tasks from "./pages/Tasks"
import Employees from "./pages/Employees"
import Analytics from "./pages/Analytics"

import Settings from "./pages/Settings"
import UploadPage from "./pages/UploadPage"

import History from "./pages/History"
import Login from "./pages/Login"


export default function App() {
  return (

    <BrowserRouter>

      <div className="app-layout">

        <Sidebar />

        <div className="main">

          <Header />

          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  )
}