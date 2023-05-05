import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userDetails: {},
  loading: false,
};

export const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

// export const UserReducer = (state = initialStore, action) => {
//   if (action.type === "USER_DETAIL") {
//     return {
//       ...state,
//       userDetails: action.payload,
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
