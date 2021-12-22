import { createSlice, createAction } from "@reduxjs/toolkit";

import { RootState } from "../../../app/store";
import { ProductType } from "../../../types/interface";

const initialState = {
  products: [] as ProductType[],
  basket: [] as ProductType[],
};

export const addToCart = createAction(
  "product/addToCart",
  function prepare(
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating?: { count: number; rate: number },
    quantity?: number
  ) {
    return {
      payload: {
        id,
        title,
        price,
        description,
        category,
        image,
        rating: rating ? rating : { count: 0, rate: 0 },
        quantity,
      },
    };
  }
);

export const getBasketTotal = (basket: any) =>
  basket?.reduce((amount: any, item: { price: any }) => item.price + amount, 0);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct() {},
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addProductToCart: (state, action) => {
      state.basket.push(action.payload);
    },
  },
  extraReducers: {},
});

export const productSelector = (state: RootState) => state.product;
export const { getProduct, setProduct, addProductToCart } =
  productSlice.actions;
export default productSlice.reducer;
