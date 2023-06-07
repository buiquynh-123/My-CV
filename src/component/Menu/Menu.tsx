/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { ICategoryProps } from "../../interface/category";

const MenuPortfolioPage = ({ categories, handleClick }: ICategoryProps) => {
  const items: MenuProps["items"] = categories.map((category) => {
    return {
      label: category.name,
      key: `${category._id}`,
    };
  });

  return (
    <Menu
      className="menu"
      onClick={(item) => {
        console.log(item);
        handleClick(item.key);
      }}
      mode="horizontal"
      items={items}
    />
  );
};

export default MenuPortfolioPage;
