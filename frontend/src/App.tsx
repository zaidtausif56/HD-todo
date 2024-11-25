import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
=======
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
=======
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
      </Routes>
    </Router>
  );
};

export default App;
