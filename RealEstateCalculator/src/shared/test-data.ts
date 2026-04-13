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
  monthlyRent: 0,
};
