import axios from "axios";
import { UserType } from "../../../types/interface";

export function requestGetUsers() {
  return axios.get<UserType>("https://fakestoreapi.com/users");
}
// get single user
export function requestGetUser(id: number) {
  return axios.get(`https://fakestoreapi.com/users/${id}`);
}

export function requestlogin(data: { username: string; password: string }) {
  return axios.post("https://fakestoreapi.com/users", data);
}

export function requestAddUser(data: UserType) {
  return axios.post<UserType>("https://fakestoreapi.com/users", data);
}

// request edit user
export function requestEditUser(data: UserType) {
  return axios.patch<UserType>(
    `https://fakestoreapi.com/users/${data.id}`,
    data
  );
}

// request delete user

export function requestDeleteUser(id: number) {
  return axios.delete(`https://fakestoreapi.com/users/${id}`);
}
