import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Breadcrumb, Button, Form, FormInstance, Select, Skeleton } from "antd";
import "./productDetail.scss";
import { useState, useEffect } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../../api/product";
import { IProduct } from "../../../interface/product";
import { addToCart } from "../../../store/actions/actions";
import { connect } from "react-redux";
const ProductDetail = ({ addToCart }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormInstance>();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      setLoading(true);
      const response = await getOneProduct(id || "");
      console.log(response.data);
      setProduct(response.data);
    };
    getProductById();
  }, []);
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (formRef.current) {
      const formValues = formRef.current.getFieldsValue();
      console.log("Form value: " + formValues.color);
      const newData = {
        customer_id: "64468bfce29d0f11590e8f73",
        items: [
          {
            product_id: product?._id,
            quantity: quantity,
            size: formValues.size,
            color: formValues.color,
          },
        ],
      };
      addToCart(newData);
    }
  };
  const handleBuyNow = () => {
    if (formRef.current) {
      const formValues = formRef.current.getFieldsValue();
      console.log("Form value: " + formValues);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Thêm thuộc tính autoplay
    autoplaySpeed: 2000, // Thêm thời gian delay giữa các lần chuyển đổi
  };
  const listImage = product?.images?.map((item: any) => item.url);
  console.log(listImage);
  const Loading = () => {
    return (
      <div className="d-flex">
        <div className="col-md-6">
          <Skeleton style={{ height: "300px" }} />
        </div>
        <div className="col-md-6" style={{ lineHeight: "2" }}>
          <Skeleton style={{ height: "50px", width: "300px" }} />
          <Skeleton />
        </div>
      </div>
    );
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="productDetail-page">
          <div className="productDetail-page-images">
            <Slider {...settings} className="productDetail-page-images-slider">
              {listImage
                ? listImage.map((img) => (
                    <div>
                      <img src={img} className="productDetail-page-image" />
                    </div>
                  ))
                : ""}
            </Slider>
            <div className="productDetail-page-images-list">
              {listImage
                ? listImage.map((img) => <img src={img} alt="" />)
                : ""}
            </div>
          </div>
          <div className="productDetail-page-info">
            <div className="productDetail-page-info-top">
              <div className="productDetail-page-info-top-left">
                <h3>{product?.name}</h3>
                <p>Tình trạng: còn hàng</p>
                <p>
                  Giá: <span>{product?.price}</span>
                </p>
                <Form ref={formRef} layout="vertical">
                  <Form.Item
                    label="Màu sắc"
                    name="color"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn màu sắc sản phẩm",
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Trắng">Trắng</Select.Option>
                      <Select.Option value="Đen">Đen</Select.Option>
                      <Select.Option value="Vàng">Vàng</Select.Option>
                      <Select.Option value="Nâu">Nâu</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Kích thước"
                    name="size"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn kích thước sản phẩm",
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value="L" defaultValue="L">
                        L
                      </Select.Option>
                      <Select.Option value="M" defaultValue="M">
                        M
                      </Select.Option>
                      <Select.Option value="S" defaultValue="S">
                        S
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Số lượng">
                    <Button onClick={handleDecreaseQuantity}>
                      <MinusOutlined />
                    </Button>
                    <span
                      style={{
                        margin: "0 10px",
                        border: "1px solid rgb(241, 239, 239)",
                        padding: "6px 17px",
                        borderRadius: "6px",
                        fontSize: "0.88rem",
                      }}
                    >
                      {quantity}
                    </span>
                    <Button onClick={handleIncreaseQuantity}>
                      <PlusOutlined />
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="btn-cart"
                      name="action"
                      value="addToCart"
                      onClick={handleAddToCart}
                      htmlType="submit"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    <Button
                      className="btn-order"
                      name="action"
                      value="buyNow"
                      onClick={handleBuyNow}
                      htmlType="submit"
                    >
                      Mua hàng
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className=""></div>
            </div>
            <div></div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="productDetail">
      <div className="breadCrumbs">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
            },
            {
              title: <a href="">Sản phẩm khuyễn mãi</a>,
            },
            {
              title: <a href="">Áo khoác</a>,
            },
          ]}
        />
      </div>
      {loading ? <Loading /> : <ShowProduct />}
    </div>
  );
};
const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(ProductDetail);
