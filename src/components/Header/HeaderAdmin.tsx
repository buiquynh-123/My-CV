import "./index.css";
import { Image, Typography, Space, Badge } from "antd";
import { BellFilled, MailFilled } from "@ant-design/icons";
const Header = () => {
  return (
    <div className="Header">
      <Image
        width={40}
        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      />
      <Typography.Title>Dashboard</Typography.Title>
      <Space>
        <Badge count={6} dot>
          {/* Badge là để hiển thị số lượng , ví dụ: thư, thông báo, tin nhắn 
            count là số lượng hiển thị trên icon
            dot hiển thị dấu chấm ở góc trên icon 
          */}
          <MailFilled />
          {/* icon hòm thư */}
        </Badge>
        <Badge count={10}>
          <BellFilled />
          {/* icon thông báo */}
        </Badge>
      </Space>
    </div>
  );
};

export default Header;
