import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const gridSlice = createSlice({
  name: "grid",
  initialState: {
    initialgrid: true,
    grid2: false,
    grid3: false,
    grid5: false,
  },
  reducers: {
    toggleGrid2: (state, action) => {
      state.grid2 = action.payload;
      state.grid3 = false;
      state.grid5 = false;
      state.initialgrid = false;
    },
    toggleGrid3: (state, action) => {
      state.grid3 = action.payload;
      state.grid2 = false;
      state.grid5 = false;
      state.initialgrid = false;
    },
    toggleGrid5: (state, action) => {
      state.grid5 = action.payload;
      state.grid2 = false;
      state.grid3 = false;
      state.initialgrid = false;
    },
    resetGrid: (state) => {
      state.grid2 = false;
      state.grid3 = false;
      state.grid5 = false;
      state.initialgrid = true;
    },
  },
});

export const { toggleGrid2, toggleGrid3, toggleGrid5, resetGrid } =
  gridSlice.actions;

export const selectGrid2 = (state) => state.grid.grid2;

export const selectGrid3 = (state) => state.grid.grid3;

export const selectGrid5 = (state) => state.grid.grid5;

export const selectInitialgrid = (state) => state.grid.initialgrid;

export default gridSlice.reducer;
