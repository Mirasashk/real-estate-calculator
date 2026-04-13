import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from '../../shared/interfaces';
import { DEFAULT_VACANCY_RATE, DEFAULT_MAINTENANCE_PERCENT } from '../../utils/constants';

const initialState: UserSettings = {
  isPremium: false,
  preferredCurrency: 'USD',
  defaultVacancyRate: DEFAULT_VACANCY_RATE,
  defaultMaintenancePercent: DEFAULT_MAINTENANCE_PERCENT,
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
      return { ...state, ...action.payload };
    },
    resetSettings: () => initialState,
  },
});

export const {
  setPremiumStatus,
  setTheme,
  updateSettings,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
