import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./userReducer";
import { ItemReducer } from "./itemReducer";
import Logger from "redux-logger";

// const Logger = (store) => {
//   return (next) => {
//     return (action) => {
//       console.log(next(action));
//       return next(action);
//     };
//   };
// };

export const store = configureStore({
  reducer: { user: UserReducer.reducer, item: ItemReducer.reducer },
  middleware: (defaultMiddleware) => {
    return defaultMiddleware().concat(Logger);
  },
});

export const userAction = UserReducer.actions;
export const itemAction = ItemReducer.actions;

// createStore(
//   combineReducers({ user: UserReducer, items: ItemReducer })
// );
