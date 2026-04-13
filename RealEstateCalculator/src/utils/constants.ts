export const APP_NAME = 'Real Estate Calculator';
export const APP_VERSION = '1.0.0';

export const DEFAULT_VACANCY_RATE = 5;
export const DEFAULT_MAINTENANCE_PERCENT = 10;
export const DEFAULT_PROPERTY_MANAGEMENT_PERCENT = 10;

export const MAX_FREE_PROPERTIES = 3;
export const PREMIUM_PRICE = 2.99;

export const PROPERTY_TYPES = [
  { label: 'Single Family Rental', value: 'rental' },
  { label: 'Fix and Flip', value: 'flip' },
  { label: 'BRRRR', value: 'brrrr' },
  { label: 'Short-term/Airbnb', value: 'airbnb' },
] as const;
