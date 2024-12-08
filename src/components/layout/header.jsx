import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
