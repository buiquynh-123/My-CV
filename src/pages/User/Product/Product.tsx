import { useEffect, useState } from "react";
import { IProduct } from "../../../interface/product";
import { getAllProduct } from "../../../api/product";
import { Skeleton } from "antd";
import { NavLink } from "react-router-dom";

const ProductPage = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProduct().then(({ data }) => {
      setLoading(true);
      if (data.data) {
        setData(data.data);
        setLoading(false);
      }
      // console.log(data);
    });
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton />
        </div>
        <div className="col-md-3">
          <Skeleton />
        </div>
        <div className="col-md-3">
          <Skeleton />
        </div>
        <div className="col-md-3">
          <Skeleton />
        </div>
      </>
    );
  };
  const filterProduct = (cart: any) => {
    // mai làm lại logic lấy ra các category giải thông tin id và name vào thẻ div , p sau đó lấy mã id đó so sánh với category trong product
    const updateList = data.filter((x) => x.category === cart);
    setProducts(updateList);
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setProducts(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("mã danh mục")}
          >
            Men's Clothing
          </button>
          <button className="btn btn-outline-dark me-2">
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("mã danh mục 2")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("mã danh mục 3")}
          >
            Electionic
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("mã danh mục 4")}
          >
            Men's Clothing
          </button>
        </div>

        {products.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product._id}>
                  <img
                    src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/6._Combo_03_Ao_thun_nam_Cotton_Coolmate_Basics_200gsm3_copy.jpg"
                    alt={product.name?.substring(0, 12)}
                    height={"350px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title ">{product.name}...</h5>
                    <p className="card-text lead fw-bold">{product.price}đ</p>

                    <NavLink
                      to={`/products/${product._id}`}
                      className="btn btn-outline-dark"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Lates Products</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProduct />}
      </div>
    </div>
  );
};

export default ProductPage;
