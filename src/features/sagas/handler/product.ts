import { call, put } from "redux-saga/effects";
import { requestGetsProducts } from "../request/product";
import { setProduct } from "../../slices/product/productSlice";
import { addProductToCart } from "../../slices/product/productSlice";

export function* handleGetProduct(): any {
  try {
    const response = yield call(requestGetsProducts);
    yield put(setProduct(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddToCart(action: any): any {
  try {
    const {
      payload: {
        id,
        title,
        price,
        description,
        category,
        image,
        rating: { rate },
        quantity,
      },
    } = action;

    yield put(
      addProductToCart({
        id,
        title,
        price,
        description,
        category,
        image,
        rate,
        quantity,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
