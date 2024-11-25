import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import { AuthProvider } from "./context/AuthContext";
=======
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
<<<<<<< HEAD
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
=======
root.render(<App />);
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
