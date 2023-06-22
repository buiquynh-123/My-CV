import React from "react";
import { Image, Space, Badge, Typography, Input } from "antd";
const { Search } = Input;
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import SideMenu from "../Menu/Menu";
export interface ISearch {
  onSearch: (keyword: string) => void;
}
const HeaderLayout: React.FC<ISearch> = (props) => {
  const navigate = useNavigate();
  const { onSearch } = props;

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         onClick={() => {
  //           // accessToken = "";
  //         }}
  //       >
  //         Đăng xuất
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         onClick={(e) => {
  //           navigate("/signin");
  //         }}
  //       >
  //         Đăng nhập
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <a target="_blank" rel="noopener noreferrer">
  //         3rd menu item
  //       </a>
  //     ),
  //   },
  // ];

  return (
    <div className="Header_Only">
      <Image
        className="Header_Only_img"
        width={100}
        src="https://fs-04.web4s.vn/uploads/plugin/setting/3/i-n-may-logo-medium-0.png"
      />
      <SideMenu />
      <Space className="Header_Only_Right">
        <Search
          className="Header_Only_Search"
          placeholder="input search text"
          onSearch={handleSearch}
          name="searchQuery"
          enterButton
        />

        <Badge className="Header_Cart" count={1}>
          <ShoppingCartOutlined />
        </Badge>

        <div>
          <Typography.Text
            className="signup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Đăng kí /
          </Typography.Text>
          <Typography.Text
            className="signin"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Đăng nhập
          </Typography.Text>
        </div>
      </Space>
    </div>
  );
};

export default HeaderLayout;
