import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  loading: false,
};

export const ItemReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setItemDetails(state, action) {
      state.items = action.payload;
    },
  },
});

// export const ItemReducer = (state = initialStore, action) => {
//   if (action.type === "ITEM_DETAILS") {
//     return {
//       ...state,
//       items: action.payload,
//     };
//   }
//   if (action.type === "SOME_TYPE") {
//     return {
//       ...state,
//       loading: true,
//     };
//   }
//   return state;
// };
