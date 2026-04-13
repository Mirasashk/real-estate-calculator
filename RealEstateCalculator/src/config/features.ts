// Feature flags for gradual rollout
export const features = {
  // Free tier features
  basicCalculator: true,
  propertyList: true,
  basicReports: true,
  
  // Premium features (gated)
  advancedCalculations: false,
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
