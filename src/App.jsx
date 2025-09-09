import { Router } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthProvider } from "./context/AuthContext";
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
