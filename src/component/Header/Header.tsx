/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";
import {
  DatabaseOutlined,
  HomeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
const Header = () => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      icon: <HomeOutlined />,
      label: "Home",
      key: "/home",
      className: "title_menu",
    },

    {
      icon: <ProfileOutlined />,
      label: "About",
      key: "/about",
      className: "title_menu",
    },

    {
      icon: <DatabaseOutlined />,
      label: "Portfolio",
      key: "/portfolio",
      className: "title_menu",
    },
  ];

  return (
    <Menu
      className="menu"
      onClick={(item) => {
        navigate(item.key);
      }}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
