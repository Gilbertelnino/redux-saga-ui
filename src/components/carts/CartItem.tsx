import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = () => {
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src="https://via.placeholder.com/150" alt="product" />
      </div>
      <div className="cartItem__info">
        <p className="cartItem__title">Some item</p>
        <p className="cartItem__price">$10</p>
        <p className="cartItem__quantity">1</p>
      </div>
      <div className="cartItem__remove">
        <button>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
export default CartItem;
