import axios from "axios";
import { ProductType } from "../../../types/interface";

export const requestGetsProducts = () =>
  axios.get<ProductType[]>("https://fakestoreapi.com/products");
