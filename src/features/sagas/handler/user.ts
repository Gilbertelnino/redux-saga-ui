import { call, put } from "redux-saga/effects";
import {
  requestGetUsers,
  requestAddUser,
  requestEditUser,
  requestGetUser,
  requestDeleteUser,
} from "../request/user";
import {
  setLoginUser,
  setUser,
  setNewUser,
  setIsLoading,
  endIsLoading,
  editCurrentUser,
  setOneUser,
  deletedUser,
} from "../../slices/user/userSlice";
import { toast } from "react-toastify";

export function* handleGetUsers(): any {
  try {
    const response = yield call(requestGetUsers);
    yield put(setUser(response.data));
  } catch (error: any) {
    toast.error(error.message);
  }
}
// handle get one user
export function* handleGetUser(action: { payload: any }): any {
  try {
    const {
      payload: { id },
    } = action;
    const response = yield call(requestGetUser, id);
    yield put(setOneUser(response.data));
  } catch (error: any) {
    toast.error(error.message);
  }
}

export function* handleLogin(action: { payload: any }) {
  try {
    const {
      payload: { username, password },
    } = action;
    yield put(setLoginUser({ username: username, password }));
  } catch (error: any) {
    toast.error(error.message);
  }
}

export function* handleAddNewUser(action: { payload: any }): any {
  try {
    yield put(setIsLoading());
    const { payload } = action;
    const response = yield call(requestAddUser, payload);
    yield put(setNewUser(response.data));
    yield put(endIsLoading());
  } catch (error: any) {
    toast.error(error.message);
    yield put(endIsLoading());
  }
}

// handle edit user

export function* handleEditUser(action: { payload: any }): any {
  try {
    yield put(setIsLoading());
    const { payload } = action;
    const response = yield call(requestEditUser, payload);
    yield put(editCurrentUser(response.data));
    yield put(endIsLoading());
  } catch (error: any) {
    toast.error(error.message);
    yield put(endIsLoading());
  }
}

// handle delete user

export function* handleDeleteUser(action: { payload: any }): any {
  try {
    yield put(setIsLoading());
    const {
      payload: { id },
    } = action;

    const response = yield call(requestDeleteUser, id);
    yield put(deletedUser(response.data));
    yield put(endIsLoading());
  } catch (error: any) {
    toast.error(error.message);
    yield put(endIsLoading());
  }
}
