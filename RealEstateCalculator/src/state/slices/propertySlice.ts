import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '../../shared/interfaces';

interface PropertyState {
  properties: Property[];
  selectedPropertyId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  selectedPropertyId: null,
  isLoading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.properties.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(p => p.id !== action.payload);
    },
    setSelectedProperty: (state, action: PayloadAction<string | null>) => {
      state.selectedPropertyId = action.payload;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    },
  },
});

export const {
  addProperty,
  updateProperty,
  deleteProperty,
  setSelectedProperty,
  setProperties,
} = propertySlice.actions;

export default propertySlice.reducer;
