import "./App.css";
import Login from "./components/Login/Login";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </>
  );
}

export default App;
