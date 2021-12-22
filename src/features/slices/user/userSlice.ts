import { createSlice, createAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { UserType, LoginType } from "../../../types/interface";

const initialState = {
  users: [] as UserType[],
  user: null as any,
  isLoading: false,
  oneUser: null as any,
};

export const loginUser = createAction(
  "user/loginUser",
  function prepare(user: LoginType) {
    return {
      payload: {
        ...user,
      },
    };
  }
);

export const addNewUser = createAction(
  "user/addNewUser",
  function prepare(user: UserType) {
    return {
      payload: {
        ...user,
      },
    };
  }
);

export const editUser = createAction(
  "user/editUser",
  function prepare(user: UserType) {
    return {
      payload: {
        ...user,
      },
    };
  }
);

// get single user

export const getUser = createAction(
  "user/getUser",
  function prepare(id?: string) {
    return {
      payload: {
        id,
      },
    };
  }
);

// delete user

export const deleteUser = createAction(
  "user/deleteUser",
  function prepare(id?: string) {
    return {
      payload: {
        id,
      },
    };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers() {},
    setUser: (state, action) => {
      state.users = action.payload;
    },
    setLoginUser: (state, action) => {
      state.user = action.payload;
    },
    setNewUser: (state, action) => {
      const { payload } = action;
      if (payload) {
        state.users.push(action.payload);
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    setOneUser: (state, action) => {
      state.oneUser = action.payload;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    endIsLoading: (state) => {
      state.isLoading = false;
    },

    editCurrentUser: (state, action) => {
      const { payload } = action;
      if (payload) {
        const index = state.users.findIndex((user) => user.id === payload.id);
        state.users[index] = payload;
      }
    },
    deletedUser: (state, action) => {
      const {
        payload: { id },
      } = action;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
  extraReducers: {},
});

export const userSelector = (state: RootState) => state.users;
export const {
  getUsers,
  setUser,
  setLoginUser,
  setNewUser,
  setIsLoading,
  endIsLoading,
  editCurrentUser,
  setOneUser,
  deletedUser,
} = userSlice.actions;
export default userSlice.reducer;
