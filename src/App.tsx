import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "./Layouts/WebsiteLayout/WebsiteLayout";
import HomePage from "./pages/User/Home/HomePage";
import ProductDetail from "./pages/User/ProductDetail/ProductDetail";
import { useEffect, useState } from "react";
import { getAllProduct } from "./api/product";
import { IProduct } from "./interface/product";
import { getAllCategory } from "./api/category";
import { ICategory } from "./interface/category";
import ProductPage from "./pages/User/Product/Product";
// import Cart from "./components/Cart/Cart";
import { ICartItems } from "./interface/cart";
import { getAll } from "./api/cart";
import News from "./pages/User/News/News";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [carts, setCarts] = useState<ICartItems[]>([]);

  useEffect(() => {
    getAllProduct().then(({ data }) => {
      setProducts(data.data);
      // console.log(data);
    });

    getAllCategory().then(({ data }) => {
      setCategories(data);
    });
    getAll().then(({ data }) => {
      setCarts(data.carts);
      console.log(data.carts);
    });
  }, []);
  console.log(carts);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route
            index
            element={<HomePage products={products} categories={categories} />}
          />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          {/* <Route path="signin" element={<Auth />} />} */}
          <Route
            path="cart"
            // element={<Cart carts={carts} products={products} />}
          />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
