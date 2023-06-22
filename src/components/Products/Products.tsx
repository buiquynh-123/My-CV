/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "swiper/swiper-bundle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getOneProduct } from "../../api/product";
import FormAddCart from "../FormAddCart/FormAddCart";
import { IProduct } from "../../interface/product";
import "./Products.css";

const Products = ({ products }: any) => {
  const [idProduct, setIdProduct] = useState("");
  const [product, setProduct] = useState<IProduct>();
  const [isShowForm, setIsShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getOneProduct(idProduct).then(({ data }) => {
      setProduct(data);
    });
  }, [idProduct]);
  const onHandleClosing = () => {
    console.log("hàm xử lý đóng form");
    setIsShowForm(false);
  };

  const data: IProduct[] = products.map((item: any) => {
    return {
      key: item._id,
      ...item,
    };
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenForm = (e: any) => {
    setIdProduct(e.target.id);
    console.log("hiển thị form thêm vào giỏ hàng");
    setIsShowForm(true);
  };

  const showForm = isShowForm ? (
    <FormAddCart product={product} handleClose={onHandleClosing} />
  ) : (
    ""
  );

  return (
    <div>
      {showForm}
      <h2 className="">Danh sách sản phẩm</h2>
      <div className="product_list">
        {data.map((product) => (
          <div
            className="product_item"
            key={product?._id}
            onClick={() => {
              navigate(`/products/${product?._id}`);
            }}
          >
            <div>
              <img
                className="product-item__img"
                width={200}
                src={product.image}
                alt={product.name}
              />
            </div>
            <div>
              <h3 className="product-item_name">{product.name}</h3>
              <div className="cartandprice">
                <p className="product-item_price">{product.price}</p>
                <button
                  id={product?._id}
                  className="Product-item_btn"
                  // id="add-to-cart-button"
                  // type="primary"
                  // icon={<ShoppingCartOutlined />}
                  onClick={handleOpenForm}
                >
                  <ShoppingCartOutlined className="Product-item-icon" />
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
