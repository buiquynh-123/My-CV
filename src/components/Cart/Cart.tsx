import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import "./style.scss";
// import { IProduct } from "../../interface/product";
// import { ICartItems } from "../../interface/cart";
const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  return (
    <div>
      <div className="my-cart">
        <ShoppingCartOutlined className="my-cartIcon" />
        <span className="title-cart">Giở hàng của bạn</span>
      </div>
      <div>
        <table className="table-cart">
          <tr className="table-cart-rowFirst">
            <td className="table-cart-col">SẢN PHẨM</td>
            <td className="table-cart-col">ĐƠN GIÁ</td>
            <td className="table-cart-col">SỐ LƯỢNG</td>
            <td className="table-cart-col">THÀNH TIỀN</td>
          </tr>

          <tr className="table-cart-row ">
            <td className="table-cart-col ">
              <div className="table-cart-colInfo">
                <div className="table-cart-colInfoImg">
                  {/*ảnh sản phẩm  */}
                  <img
                    className="table-cart-colInfo-img"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                </div>
                <div className="table-cart-info">
                  <div className="table-cart-infoName">Tên sản phẩm</div>
                  <div className="table-cart-infoColor">Màu khách chọn</div>
                  <Button type="primary" className="table-cart-infoRemove">
                    <DeleteOutlined />
                    Bỏ sản phẩm
                  </Button>
                </div>
              </div>
            </td>
            <td className="table-cart-col">
              <div className="table-cart-infoPrice">480.000đ</div>
            </td>
            <td className="table-cart-col">
              <Button type="primary" onClick={handleDecreaseQuantity}>
                -
              </Button>
              <span style={{ margin: "0 10px" }}>{quantity}</span>
              <Button type="primary" onClick={handleIncreaseQuantity}>
                +
              </Button>
            </td>
            <td className="table-cart-col">
              <div className="table-cart-infoPrice">480.000đ</div>
            </td>
          </tr>
        </table>
      </div>

      <div className="order">
        <div className="order-delivery">Giao hàng trên toàn quốc</div>
        <div className="">
          <div className="order-totalMoney">
            Tổng tiền: <span className="table-cart-infoPrice">480.000đ</span>
          </div>
          <div>
            <Button type="primary" danger className="table-cart-infoRemove">
              Tiến hành đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
