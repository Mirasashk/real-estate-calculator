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
