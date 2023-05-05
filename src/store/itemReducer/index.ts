import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  itemDetails: {},
  loading: false,
};

export const fetchItemDetails = createAsyncThunk(
  "item/fetchItemDetails",
  async (paramId: any) => {
    const response = await axios.get(
      `http://localhost:5000/itemDetails/${paramId}`
    );
    return response.data;
  }
);

export const ItemReducer = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemDetails(state, action) {
      state.items = action.payload;
    },
    loading(state) {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItemDetails.fulfilled, (state, action) => {
      state.itemDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchItemDetails.rejected, (state, action) => {
      state.loading = false;
      state.itemDetails = {};
    });
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
