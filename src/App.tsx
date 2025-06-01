import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Home/Home";
import SideBar from "./components/SideBar/SideBar";
import Users from "./components/UsersList/UsersList";
import AddUsers from "./components/AddUsers/AddUsers";
import Profile from "./components/Profile/Profile";
import Logout from "./components/Logout/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex" }}>
        {showSidebar && <SideBar />}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/addUsers" element={<AddUsers />} />
            <Route path="/dashboard/addUsers/:id" element={<AddUsers />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
