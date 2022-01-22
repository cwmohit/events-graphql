import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import MainNav from "./components/Navigation/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainNav />
        <Routes>
          {/* <Redirect from="/" to="/auth" exact/> */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
