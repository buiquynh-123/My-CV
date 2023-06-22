/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Form, Select } from "antd";
import "./FormAddCart.css";
import { useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/actions";

// eslint-disable-next-line react-refresh/only-export-components
const FormAddCart = ({ product, handleClose, addToCart }: any) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const HandleClosing = () => {
    handleClose();
  };

  const onFinish = (values: any) => {
    const newData = {
      customer_id: "64468bfce29d0f11590e8f73",
      items: [
        {
          product_id: product?._id,
          quantity: quantity,
          size: values.size,
          color: values.color,
        },
      ],
    };
    addToCart(newData);
    handleClose();
    // Thực hiện xử lý dữ liệu sau khi submit
  };
  console.log(product);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* kích thước */}

      <div className="box-coating" onClick={HandleClosing}></div>
      <div className="box_add_cart">
        {/* vế trái */}
        <div className="box-cart">
          <div className="box_left_cart">
            {/* item image */}
            <Slider {...settings}>
              <div className="box_img">
                <img
                  className="box_item-img"
                  width={400}
                  src={product?.image}
                />
              </div>
              <div className="box_img">
                <img
                  className="box_item-img"
                  width={400}
                  src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
                />
              </div>
              <div className="box_img">
                <img
                  className="box_item-img"
                  width={400}
                  src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
                />
              </div>
            </Slider>
            {/* list image */}
            <div className="list-img">
              <img
                className="item-img"
                width={400}
                src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
              />
              <img
                className="item-img"
                width={400}
                src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
              />
              <img
                className="item-img"
                width={400}
                src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
              />
              <img
                className="item-img"
                width={400}
                src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
              />
            </div>
          </div>

          {/* vế phải */}
          <div className="box_right_cart">
            <h2 className="product_name">{product?.name}</h2>
            <div className="status_and_brand">
              <div className="product_status">
                Tình trạng: <span className="status">hết hàng</span>
              </div>
              {/* đường thẳng ngăn cách tình trạng và thương hiệu */}
              <div className="separation_line"></div>
              <div className="product_brand">
                Thương hiệu: <span className="brand">luuly</span>
              </div>
            </div>
            <div className="product_price">
              Giá: <span className="price">{product?.price}đ</span>
            </div>
            <Form onFinish={onFinish} layout="vertical">
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
                <Button type="primary" onClick={handleDecreaseQuantity}>
                  -
                </Button>
                <span style={{ margin: "0 10px" }}>{quantity}</span>
                <Button type="primary" onClick={handleIncreaseQuantity}>
                  +
                </Button>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Thêm vào giỏ hàng
                </Button>
              </Form.Item>
            </Form>

            <div className="btn_cart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(FormAddCart);
