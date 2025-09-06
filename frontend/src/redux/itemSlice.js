// src/redux/itemSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchItems = createAsyncThunk("items/fetchItems", async (_, thunkAPI) => {
  try {
    const res = await API.get("/items");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch items");
  }
});

export const fetchItemById = createAsyncThunk("items/fetchItemById", async (id, thunkAPI) => {
  try {
    const res = await API.get(`/items/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch item");
  }
});

const itemSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrent(state) { state.current = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchItems.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchItems.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchItemById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchItemById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
      .addCase(fetchItemById.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearCurrent } = itemSlice.actions;
export default itemSlice.reducer;
