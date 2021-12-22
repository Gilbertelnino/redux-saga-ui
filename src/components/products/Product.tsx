import "./Product.css";
import { ProductType } from "../../types/interface";

const Product: React.FC<ProductType> = ({
  id,
  title,
  price,
  category,
  image,
  quantity = 10,
}) => {
  return (
    <div className="card" key={id}>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="content">
        <p className="header">{title}</p>
        <p className="desci">{category}</p>
        <p className="meta-price">${price}</p>
        <p className="quality">{quantity}</p>
      </div>
    </div>
  );
};

export default Product;
