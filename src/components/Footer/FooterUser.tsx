import "./Footer.scss";
const FooterOnly: React.FC = () => {
  const iframeStyle = {
    style: "border: 0",
  };
  return (
    <footer className="container">
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top-col">
            <h4 className="footer-top-col-title">THÔNG TIN CÔNG TY</h4>
            <ul>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Về chúng tôi</a>
              </li>
              <li>
                <a href="">Sản phẩm</a>
              </li>
              <li>
                <a href="">Tin tức</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>
          <div className="footer-top-col">
            <h4 className="footer-top-col-title">Điều khoản</h4>
            <ul>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Về chúng tôi</a>
              </li>
              <li>
                <a href="">Sản phẩm</a>
              </li>
              <li>
                <a href="">Tin tức</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>
          <div className="footer-top-col">
            <h4 className="footer-top-col-title">Hướng dẫn</h4>
            <ul>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Về chúng tôi</a>
              </li>
              <li>
                <a href="">Sản phẩm</a>
              </li>
              <li>
                <a href="">Tin tức</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>
          <div className="footer-top-col">
            <h4 className="footer-top-col-title">Hướng dẫn</h4>
            <ul>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Về chúng tôi</a>
              </li>
              <li>
                <a href="">Sản phẩm</a>
              </li>
              <li>
                <a href="">Tin tức</a>
              </li>
              <li>
                <a href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-center">
          <div className="footer-center-payment-methods">
            <h4 className="footer-center-payment-methods-title">
              Hỗ trợ thanh toán
            </h4>
            <div className="footer-center-payment-methods-groud">
              <img
                src="https://bizweb.dktcdn.net/thumb/small/100/091/132/themes/877468/assets/payment_1_image.png?1676015131562"
                alt=""
              />
              <img
                src="https://bizweb.dktcdn.net/thumb/small/100/091/132/themes/877468/assets/payment_2_image.png?1676015131562"
                alt=""
              />
              <img
                src="https://bizweb.dktcdn.net/thumb/small/100/091/132/themes/877468/assets/payment_3_image.png?1676015131562"
                alt=""
              />
              <img
                src="https://bizweb.dktcdn.net/thumb/small/100/091/132/themes/877468/assets/payment_4_image.png?1676015131562"
                alt=""
              />
              <img
                src="https://bizweb.dktcdn.net/thumb/small/100/091/132/themes/877468/assets/payment_5_image.png?1676015131562"
                alt=""
              />
            </div>
          </div>
          <div className="footer-center-customer">
            <h4 className="footer-center-customer-title">GIẢI ĐÁP THẮC MẮC</h4>
            <div className="footer-center-customer-contact">
              <div className="footer-center-customer-contact-left">
                <img
                  src="https://bizweb.dktcdn.net/thumb/icon/100/091/132/themes/877468/assets/customer_care_image.png?1676015131562"
                  alt=""
                />
                <div className="groud">
                  <p className="title">Tư vấn miễn phí (24/7)</p>
                  <a href="" className="phone">
                    1900 6750
                  </a>
                </div>
              </div>
              <div className="footer-center-customer-contact-right">
                <div className="groud">
                  <p className="title">Góp ý, phản ánh (8h00 - 20h00)</p>
                  <a href="" className="phone">
                    1900 6750
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <h4 className="footer-bottom-title">CÔNG TY CỔ PHẦN CÔNG NGHỆ DKT</h4>
          <div className="footer-bottom-row">
            <div className="footer-bottom-row-info">
              <p>
                Trụ sở chính: Tầng 4 - Tòa nhà Hanoi Group - 442 Đội Cấn - Ba
                Đình - Hà Nội
              </p>
              <p>Điện thoại : (04) 6674 2332 - (04) 3786 8904</p>
            </div>
            <div className="footer-bottom-row-info">
              <p>
                VPDD: Lầu 3 - Tòa nhà Lữ Gia - Số 70 Lữ Gia - P.15 - Q.11 - TP
                HCM
              </p>
              <p>Điện thoại : (08) 6680 9686 - (08) 3866 62764</p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright-content">
          <span>
            © Bản quyền thuộc về Avent Team | Cung cấp bởi
            <a href="">Sapo</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default FooterOnly;
