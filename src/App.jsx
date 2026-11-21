import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import DataPreview from "./pages/DataPreview.jsx";
import DataUpload from "./pages/DataUpload.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-upload" element={<DataUpload />} />
        <Route path="/data-preview" element={<DataPreview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
