import { ICategory } from "../../interface/category";
import "swiper/swiper-bundle.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Category = ({ categories }: any) => {
  const data: ICategory[] = categories.map((item: ICategory) => {
    return {
      key: item._id,
      ...item,
    };
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div>
        <h2> Danh mục</h2>
        <Slider {...settings}>
          {data.map((category) => (
            <div key={category._id}>
              <img
                width={400}
                src="https://theme.hstatic.net/200000680615/1001032358/14/img_item_category_3.jpg?v=486"
              />
              <h2>{category?.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
