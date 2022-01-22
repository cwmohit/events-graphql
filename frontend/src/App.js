import "./styles.css";
import { BrowserRouter, Route, Router, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import MainNav from "./components/Navigation/Main";
import { AuthContext } from "./context/authContext";
import { useState } from "react";

function App(props) {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const login = (token, userId, tokenExpiration) => {
    setUserId(userId);
    setToken(token);
    navigate("/");
  };
  const logout = () => {
    setUserId(null);
    setToken("");
  };
  return (
    <>
      <AuthContext.Provider
        value={{ token: token, userId: userId, login: login, logout: logout }}
      >
        <MainNav />
        <Routes>
          {/* <Redirect from="/" to="/auth" exact/> */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
