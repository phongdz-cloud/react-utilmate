import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AliwangwangOutlined,
  AuditOutlined,
  HomeOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("");

  const { user, setUser } = useContext(AuthContext);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location && location.pathname) {
      const allRoutes = ["users", "books"];
      const currentLocation = allRoutes.find((route) =>
        location.pathname.includes(route)
      );
      if (currentLocation) {
        setCurrent(currentLocation);
      } else {
        setCurrent("home");
      }
    }
  }, [location]);

  const handleLogOut = async () => {
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Đăng xuất thành công");

      navigate("/");
    }
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: "books",
      icon: <AuditOutlined />,
    },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            key: "setting",
            label: `Welcome ${user.fullName}`,
            icon: <AliwangwangOutlined />,
            children: [
              {
                key: "logout",
                label: <span onClick={handleLogOut}>Đăng xuất</span>,
              },
            ],
          },
        ]
      : []),
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
