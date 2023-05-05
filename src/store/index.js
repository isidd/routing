// import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./userReducer";
import { ItemReducer } from "./itemReducer";

export const store = configureStore({
  reducer: { user: UserReducer.reducer, item: ItemReducer.reducer },
});

export const userAction = UserReducer.actions;
export const itemAction = ItemReducer.actions;

// createStore(
//   combineReducers({ user: UserReducer, items: ItemReducer })
// );
