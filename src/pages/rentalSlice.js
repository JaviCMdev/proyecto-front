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

//Acciones que modificarán RDX
export const { select, find } = rentalSlice.actions;

//Estado del que leeremos RDX
export const rentalData = (state) => state.rental;

export default rentalSlice.reducer;