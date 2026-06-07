import "./Sidebar.css";
import logo from "../assets/images/studium-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/auth.js";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      {/* Overlay - clicks outside sidebar to close */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="Studium Logo" className="logo-icon" />
            <h2 className="gradient-text">studium</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink to="/subjects" className="nav-item">
            <span className="nav-icon">📝</span>
            <span className="nav-text">Subjects</span>
          </NavLink>
        </nav>

        {/* Divider */}
        <div className="sidebar-divider"></div>

        {/* Bottom Navigation */}
        <nav className="sidebar-nav sidebar-nav-bottom">
          {/* Future features */}
          {/* <a href="#" className="nav-item">
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </a> */}

          <a href="#" onClick={handleLogout} className="nav-item">
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </a>
        </nav>
      </div>
    </>
  );
}
