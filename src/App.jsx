import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeWrapper from "./pages/HomeWrapper";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<LoginAdmin />} />

          <Route path="/admin" element={<Admin />} />
          <Route
            path="/home"
            element={
              <HomeWrapper>
                <Home />
              </HomeWrapper>
            }
          />
          <Route
            path="/"
            element={
              <HomeWrapper>
                <Home />
              </HomeWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
