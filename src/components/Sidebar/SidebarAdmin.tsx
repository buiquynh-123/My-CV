import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserOutlined,
  CalendarOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons/lib/icons";

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/admin",
          },
          {
            label: "Product",
            icon: <CalendarOutlined />,
            key: "/admin/products",
          },
          {
            label: "Category",
            icon: <AppstoreAddOutlined />,
            key: "/admin/category",
          },
          {
            label: "Orders",
            icon: <ShoppingCartOutlined />,
            key: "/admin/order",
          },
          {
            label: "Customers",
            icon: <UserOutlined />,
            key: "/admin/user",
          },
          {
            label: "Logout",
            icon: <LogoutOutlined />,
            key: "/",
            onClick: () => {
              navigate("/");
            },
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
