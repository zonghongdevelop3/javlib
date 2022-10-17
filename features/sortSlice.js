import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sortReleaseDateDsc: true,
    sortReleaseDateAsc: false,
    sortIdAZ: false,
    sortIdZA: false,
    sortTitleAZ: false,
    sortTitleZA: false,
  },
  reducers: {
    toggleSortReleaseDateDsc: (state, action) => {
      state.sortReleaseDateDsc = action.payload;
      state.sortReleaseDateAsc = false;
      state.sortIdAZ = false;
      state.sortIdZA = false;
      state.sortTitleAZ = false;
      state.sortTitleZA = false;
    },
    toggleSortReleaseDateAsc: (state, action) => {
      state.sortReleaseDateDsc = false;
      state.sortReleaseDateAsc = action.payload;
      state.sortIdAZ = false;
      state.sortIdZA = false;
      state.sortTitleAZ = false;
      state.sortTitleZA = false;
    },
    toggleSortIdAZ: (state, action) => {
      state.sortReleaseDateDsc = false;
      state.sortReleaseDateAsc = false;
      state.sortIdAZ = action.payload;
      state.sortIdZA = false;
      state.sortTitleAZ = false;
      state.sortTitleZA = false;
    },
    toggleSortIdZA: (state, action) => {
      state.sortReleaseDateDsc = false;
      state.sortReleaseDateAsc = false;
      state.sortIdAZ = false;
      state.sortIdZA = action.payload;
      state.sortTitleAZ = false;
      state.sortTitleZA = false;
    },
    toggleSortTitleAZ: (state, action) => {
      state.sortReleaseDateDsc = false;
      state.sortReleaseDateAsc = false;
      state.sortIdAZ = false;
      state.sortIdZA = false;
      state.sortTitleAZ = action.payload;
      state.sortTitleZA = false;
    },
    toggleSortTitleZA: (state, action) => {
      state.sortReleaseDateDsc = false;
      state.sortReleaseDateAsc = false;
      state.sortIdAZ = false;
      state.sortIdZA = false;
      state.sortTitleAZ = false;
      state.sortTitleZA = action.payload;
    },
  },
});

export const {
  toggleSortReleaseDateDsc,
  toggleSortReleaseDateAsc,
  toggleSortIdAZ,
  toggleSortIdZA,
  toggleSortTitleAZ,
  toggleSortTitleZA,
} = sortSlice.actions;

export const selectSortReleaseDateDsc = (state) =>
  state.sort.sortReleaseDateDsc;

export const selectSortReleaseDateAsc = (state) =>
  state.sort.sortReleaseDateAsc;

export const selectSortIdAZ = (state) => state.sort.sortIdAZ;

export const selectSortIdZA = (state) => state.sort.sortIdZA;

export const selectSortTitleAZ = (state) => state.sort.sortTitleAZ;

export const selectSortTitleZA = (state) => state.sort.sortTitleZA;

export default sortSlice.reducer;
