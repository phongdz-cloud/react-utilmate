import "./header.css";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <a className="active" href="#home">
            Home
          </a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
