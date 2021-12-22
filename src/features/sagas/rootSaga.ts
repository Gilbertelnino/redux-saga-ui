import { takeLatest } from "redux-saga/effects";
import { addToCart, getProduct } from "../slices/product/productSlice";
import {
  getUsers,
  loginUser,
  addNewUser,
  editUser,
  getUser,
  deleteUser,
} from "../slices/user/userSlice";
import { handleAddToCart, handleGetProduct } from "./handler/product";
import {
  handleGetUsers,
  handleLogin,
  handleAddNewUser,
  handleEditUser,
  handleGetUser,
  handleDeleteUser,
} from "./handler/user";

export function* watcherSaga() {
  yield takeLatest(getUsers.type, handleGetUsers);
  yield takeLatest(getUser, handleGetUser);
  yield takeLatest(loginUser, handleLogin);
  yield takeLatest(getProduct.type, handleGetProduct);
  yield takeLatest(addToCart, handleAddToCart);
  yield takeLatest(addNewUser, handleAddNewUser);
  yield takeLatest(editUser, handleEditUser);
  yield takeLatest(deleteUser, handleDeleteUser);
}
