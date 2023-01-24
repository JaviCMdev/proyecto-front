
import { createSlice } from '@reduxjs/toolkit';

export const serieSlice = createSlice({
    name: 'serie',
    initialState: {
      choosen : {},
      series: []
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
      },
      clear: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

//Acciones que modificarán RDX
export const { select, find, clear } = serieSlice.actions;

//Estado del que leeremos RDX
export const serieData = (state) => state.serie;

export default serieSlice.reducer;