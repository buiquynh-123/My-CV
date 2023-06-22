import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      {" "}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Home",
            key: "/",
            className: "title_menu",
          },
          {
            label: "Product",
            key: "/products",
            className: "title_menu",
          },
          {
            label: "Category",
            key: "/category",
            className: "title_menu",

            children: [
              {
                label: "Category 1",
                key: "/category/:id",
                className: "title_menu",
              },
              {
                label: "Category2",
                key: "/category/:id",
                className: "title_menu",
              },
            ],
          },
          {
            label: "Contact",
            key: "/contact",
            className: "title_menu",
          },
        ]}
      />
    </div>
  );
};

export default SideMenu;
