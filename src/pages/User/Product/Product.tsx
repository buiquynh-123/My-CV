import { IProduct, ProductPageProps } from "../../../interface/product";

const ProductPage = ({ products }: ProductPageProps) => {
  console.log(products);
  const data: IProduct[] = products.map((item) => {
    return {
      key: item._id,
      ...item,
    };
  });

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <h3>{item.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPage;
