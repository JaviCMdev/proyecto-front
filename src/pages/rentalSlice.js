import { createSlice } from '@reduxjs/toolkit';

export const rentalSlice = createSlice({
    name: 'rental',
    initialState: {
      rentals : {},
      allrentals: []
    },
    reducers: {
      select: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      find: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});
export const { select, find } = rentalSlice.actions;
export const rentalData = (state) => state.rental;
export default rentalSlice.reducer;