import { Link } from "react-router-dom";

import "./navBar.css";

const navLinks = [
  { path: "/", text: "Home" },
  { path: "/history", text: "History" },
] as const;

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-ul">
        {navLinks.map(({ path, text }) => (
          <li key={path}>
            <Link to={path} className="nav-link">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
