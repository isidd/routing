import { createStore } from "redux";

const initialStore = {
  userDetails: {},
  items: [],
  loading: false,
};

const reducer = (state = initialStore, action) => {
  if (action.type === "USER_DETAILS") {
    return {
      ...state,
      userDetails: action.payload,
    };
  }
  if (action.type === "SOME_TYPE") {
    return {
      ...state,
      loading: true,
    };
  }
  return state;
};

export const store = createStore(reducer);
