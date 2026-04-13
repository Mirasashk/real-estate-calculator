# Agent 1: Architect / Tech Lead
## Detailed Specification

**Agent ID:** `architect`  
**Role:** Technical planning, project setup, architecture, code review, integration  
**Priority:** CRITICAL - Start First  
**Estimated Duration:** 2-3 days initial setup, ongoing throughout project  

---

## 🎯 Mission

Establish the technical foundation for the Real Estate Investment Calculator app. Create a scalable, maintainable React Native project structure that all other agents will build upon. Serve as the integration hub and code quality gatekeeper.

---

## 📋 Deliverables

### Phase 1: Project Setup (Days 1-2)

#### 1.1 React Native Project Initialization
```bash
# Create project
npx react-native@latest init RealEstateCalculator
# OR use Expo for faster setup
npx create-expo-app RealEstateCalculator
```

**Requirements:**
- [ ] React Native 0.72+ (or latest stable)
- [ ] TypeScript configuration
- [ ] Folder structure established
- [ ] Git repository initialized with `.gitignore`

#### 1.2 Folder Structure
```
RealEstateCalculator/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Buttons, inputs, cards
│   │   └── property/       # Property-specific components
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── PropertyInputScreen.tsx
│   │   ├── AnalysisScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── PremiumScreen.tsx
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── state/              # State management
│   │   ├── store.ts        # Redux/Context setup
│   │   ├── slices/         # Redux slices
│   │   └── hooks.ts        # Custom hooks
│   ├── services/           # Business logic
│   │   ├── calculations/   # Financial calculations
│   │   ├── storage/        # Data persistence
│   │   └── reports/        # PDF generation
│   ├── models/             # TypeScript interfaces
│   │   ├── Property.ts
│   │   ├── Analysis.ts
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── formatters.ts   # Number/date formatters
│   │   ├── validators.ts   # Input validation
│   │   └── constants.ts    # App constants
│   ├── shared/             # Shared resources
│   │   ├── interfaces.ts   # Central interfaces
│   │   ├── test-data.ts    # Test properties
│   │   └── types.ts        # Type definitions
│   └── config/             # App configuration
│       ├── theme.ts        # Colors, typography
│       └── ads.ts          # Ad configuration
├── __tests__/              # Test files
├── docs/                   # Documentation
└── assets/                 # Images, fonts
```

#### 1.3 Core Dependencies Installation
```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# State Management
npm install @reduxjs/toolkit react-redux redux-persist
npm install @react-native-async-storage/async-storage

# UI Components
npm install react-native-paper react-native-vector-icons

# Utilities
npm install decimal.js date-fns

# Development
npm install --save-dev @types/react @types/react-native
npm install --save-dev jest @testing-library/react-native
```

#### 1.4 Configuration Files

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

**.eslintrc.js:**
```javascript
module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': ['warn', { allow: ['error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
```

### Phase 2: Core Architecture (Days 2-3)

#### 2.1 Navigation Setup

**src/navigation/AppNavigator.tsx:**
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@screens/HomeScreen';
import { PropertyInputScreen } from '@screens/PropertyInputScreen';
import { AnalysisScreen } from '@screens/AnalysisScreen';

export type RootStackParamList = {
  Home: undefined;
  PropertyInput: { propertyId?: string };
  Analysis: { propertyId: string };
  Settings: undefined;
  Premium: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PropertyInput" component={PropertyInputScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

#### 2.2 State Management Setup

**src/state/store.ts:**
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { propertySlice } from './slices/propertySlice';
import { settingsSlice } from './slices/settingsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['properties', 'settings'],
};

export const store = configureStore({
  reducer: {
    properties: persistReducer(persistConfig, propertySlice.reducer),
    settings: settingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### 2.3 Central Interfaces Definition

**src/shared/interfaces.ts:**
```typescript
import { Decimal } from 'decimal.js';

export type DealType = 'rental' | 'flip' | 'brrrr' | 'airbnb';

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Purchase details
  purchasePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  closingCosts: number;
  rehabBudget: number;
  
  // Income
  monthlyRent: number;
  otherIncome: number;
  vacancyRate: number;
  
  // Expenses
  propertyTaxes: number;
  insurance: number;
  propertyManagement: number;
  maintenance: number;
  utilities: number;
  hoaFees: number;
  otherExpenses: number;
  
  // Deal type
  dealType: DealType;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  isPremium: boolean;
}

export interface AnalysisResult {
  // Basic metrics
  monthlyMortgage: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  
  // Returns
  roi: number;
  cashOnCashReturn: number;
  capRate: number;
  
  // Income/Expense
  grossRent: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  netOperatingIncome: number;
  
  // Ratios
  debtServiceCoverageRatio: number;
  grossRentMultiplier: number;
  breakEvenRatio: number;
  
  // Premium calculations
  maxAllowableOffer?: number;
  totalCashNeeded?: number;
  projectedFlipProfit?: number;
  irr?: number;
  
  // Projections
  fiveYearProjection?: YearlyProjection[];
}

export interface YearlyProjection {
  year: number;
  grossRent: number;
  expenses: number;
  cashFlow: number;
  propertyValue: number;
  equity: number;
}

export interface UserSettings {
  isPremium: boolean;
  preferredCurrency: string;
  defaultVacancyRate: number;
  defaultMaintenancePercent: number;
  theme: 'light' | 'dark';
}
```

#### 2.4 Theme Configuration

**src/config/theme.ts:**
```typescript
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const colors = {
  primary: '#2E7D32',      // Green - money/investment theme
  primaryDark: '#1B5E20',
  primaryLight: '#4CAF50',
  accent: '#FF9800',       // Orange - calls to action
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  divider: '#BDBDBD',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '700' as const },
  h3: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodySmall: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
};

export const appTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
  },
};
```

#### 2.5 Feature Flags System

**src/config/features.ts:**
```typescript
// Feature flags for gradual rollout
export const features = {
  // Free tier features
  basicCalculator: true,
  propertyList: true,
  basicReports: true,
  
  // Premium features (gated)
  advancedCalculations: false,  // Controlled by isPremium
  pdfExport: false,
  multipleDealTypes: false,
  scenarioComparison: false,
  unlimitedProperties: false,
  
  // Development flags
  showAds: true,
  enableAnalytics: false,
  enableCrashReporting: true,
};

export const isFeatureEnabled = (
  feature: keyof typeof features,
  isPremium: boolean
): boolean => {
  const premiumFeatures = [
    'advancedCalculations',
    'pdfExport', 
    'multipleDealTypes',
    'scenarioComparison',
    'unlimitedProperties',
  ];
  
  if (premiumFeatures.includes(feature) && !isPremium) {
    return false;
  }
  
  return features[feature];
};
```

### Phase 3: Shared Resources (Day 3)

#### 3.1 Test Data

**src/shared/test-data.ts:**
```typescript
import { Property } from './interfaces';

export const testProperty: Property = {
  id: 'test-001',
  address: '123 Main St',
  city: 'Phoenix',
  state: 'AZ',
  zipCode: '85001',
  purchasePrice: 250000,
  downPayment: 50000,
  downPaymentPercent: 20,
  loanAmount: 200000,
  interestRate: 7.5,
  loanTermYears: 30,
  closingCosts: 5000,
  rehabBudget: 10000,
  monthlyRent: 1800,
  otherIncome: 0,
  vacancyRate: 5,
  propertyTaxes: 2000,
  insurance: 1200,
  propertyManagement: 180,
  maintenance: 150,
  utilities: 0,
  hoaFees: 0,
  otherExpenses: 50,
  dealType: 'rental',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isPremium: false,
};

export const testFlipProperty: Property = {
  ...testProperty,
  id: 'test-002',
  dealType: 'flip',
  afterRepairValue: 320000,
  rehabBudget: 35000,
  monthlyRent: 0,
};
```

#### 3.2 Utility Functions

**src/utils/formatters.ts:**
```typescript
import { Decimal } from 'decimal.js';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number, decimals = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};
```

### Phase 4: CI/CD Setup (Day 3-4)

#### 4.1 GitHub Actions Workflow

**.github/workflows/ci.yml:**
```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run type-check

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: cd ios && pod install
      - run: npm run ios:build

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run android:build
```

---

## 🔍 Code Review Checklist

When reviewing other agents' code, verify:

- [ ] Code follows project style guide
- [ ] TypeScript types are correct and comprehensive
- [ ] No hardcoded values (use constants/config)
- [ ] Error handling is implemented
- [ ] No console.log in production code
- [ ] Unit tests exist for complex logic
- [ ] Performance is acceptable (no unnecessary re-renders)
- [ ] Accessibility labels are present
- [ ] Imports use path aliases (@components, etc.)

---

## 📞 Coordination Points

### With UI/UX Agent:
- Provide theme configuration
- Review component props interfaces
- Ensure navigation routes match screen names

### With Calc Engine Agent:
- Review calculation interfaces
- Ensure test data covers edge cases
- Verify precision requirements (Decimal.js)

### With Data Storage Agent:
- Define storage schema
- Review Redux slice structure
- Plan migration strategy

### With Monetization Agent:
- Implement feature flags
- Review premium gating logic
- Ensure purchase restoration flow

### With QA Agent:
- Provide test environment setup
- Review test coverage requirements
- Coordinate on integration test scenarios

---

## ✅ Success Criteria

- [ ] Project builds successfully on iOS Simulator
- [ ] Project builds successfully on Android Emulator
- [ ] All agents can import from shared/interfaces.ts
- [ ] Navigation works between all screens (even if empty)
- [ ] State persists across app restarts
- [ ] CI/CD pipeline passes
- [ ] Code review process documented
- [ ] All agents understand folder structure

---

## 🚀 Next Steps After Completion

1. Spawn UI/UX Agent with theme and interfaces ready
2. Spawn Calc Engine Agent with interfaces ready
3. Monitor both agents for integration issues
4. Prepare for Data Storage Agent spawn

**File Location:** Save all work to `./projects/real-estate-calculator/`  
**Branch:** `main` (after initial setup, use feature branches)
