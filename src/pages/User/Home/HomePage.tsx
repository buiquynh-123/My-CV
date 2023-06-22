/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { IProduct, ProductPageProps } from "../../../interface/product";
import { AppContext } from "../../../Layouts/WebsiteLayout/WebsiteLayout";
import Products from "../../../components/Products/Products";
import Banners from "../../../components/Banner/Banners";
interface CustomBreadcrumbItemProps {
  to: string;
  label: string;
}
const CustomBreadcrumbItem = ({ to, label }: CustomBreadcrumbItemProps) => {
  return (
    <Breadcrumb.Item>
      <Link to={to}>{label}</Link>
    </Breadcrumb.Item>
  );
};
const items = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
function HomePage({ products, categories }: ProductPageProps) {
  // const navigate = useNavigate();
  const [data, setData] = useState<IProduct[]>([]);

  const { searchResult } = useContext(AppContext);
  useEffect(() => {
    if (searchResult) {
      return setData(searchResult);
    }
  }, [searchResult]);
  useEffect(() => {
    setData(products);
  }, [products]);
  console.log(data);

  data.map((item) => {
    return {
      key: item._id,
      ...item,
    };
  });
  const listCategory = categories.map((category: any) => {
    return {
      key: category._id,
      ...category,
    };
  });

  return (
    <div>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb>
          {items.map((item) => (
            <CustomBreadcrumbItem key={item.to} {...item} />
          ))}
        </Breadcrumb>
        <Banners />
        <div className="content-tabs"></div>
        <Products products={data} categories={listCategory} />
      </Content>
    </div>
  );
}

export default HomePage;
