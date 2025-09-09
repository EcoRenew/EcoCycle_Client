import { Router } from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/auth/Login/Login";
function App() {
  return (
    <>
      <AuthProvider>
        {/* <Login /> */}
        <Register />
      </AuthProvider>
    </>
  );
}

export default App;
