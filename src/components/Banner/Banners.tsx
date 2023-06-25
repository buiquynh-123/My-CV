import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./banner.css";
const Banners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Thêm thuộc tính autoplay
    autoplaySpeed: 2000, // Thêm thời gian delay giữa các lần chuyển đổi
  };
  const listImage = [
    "https://theme.hstatic.net/200000680615/1001032358/14/slide_3_img.jpg?v=486",
    "https://theme.hstatic.net/200000680615/1001032358/14/slide_2_img.jpg?v=486",
    "https://theme.hstatic.net/200000680615/1001032358/14/slide_1_img.jpg?v=486",
  ];
  return (
    <div className="banner">
      <Slider {...settings}>
        {listImage.map((img, index) => (
          <div key={index + 1}>
            <img className="banner_img" src={img} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banners;
