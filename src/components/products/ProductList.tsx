import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getProduct,
  productSelector,
} from "../../features/slices/product/productSlice";
import Product from "./Product";
import "./Product.css";
import { useEffect } from "react";
import Header from "../header/Header";

function ProductList() {
  const { products } = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className="cards-container">
        {products &&
          products.map((product) => (
            <div key={product.id}>
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
                rating={product.rating}
                quantity={product.quantity}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default ProductList;
