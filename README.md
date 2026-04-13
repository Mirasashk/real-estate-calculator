# Real Estate Investment Calculator

A cross-platform mobile app for real estate investors to analyze properties, calculate returns, and make informed investment decisions.

## 🎯 Project Overview

- **Platform:** React Native (iOS & Android)
- **Pricing Model:** Freemium (Free with ads + $2.99 Premium)
- **Timeline:** 6-8 weeks to MVP
- **Team:** AI Multi-Agent Development

## 📱 Features

### Free Tier
- Basic property analysis
- Cash flow, ROI, Cap Rate calculations
- Save up to 3 properties
- Long-term rental calculator

### Premium Tier ($2.99)
- Fix-and-flip analysis
- BRRRR calculator
- Short-term/Airbnb estimates
- PDF report generation
- Unlimited properties
- Scenario comparisons

## 🛠️ Tech Stack

- **Framework:** React Native with TypeScript
- **State Management:** Redux Toolkit + Redux Persist
- **UI Library:** React Native Paper
- **Calculations:** Decimal.js for precision
- **Storage:** AsyncStorage / SQLite
- **Monetization:** RevenueCat (IAP) + Google AdMob

## 📁 Project Structure

```
real-estate-calculator/
├── specs/              # Agent specifications
├── agents/             # Agent progress tracking
├── shared/             # Shared resources & test data
├── docs/               # Documentation
└── src/                # React Native source (created by agents)
```

## 🤖 Multi-Agent Development

This project uses 6 specialized AI agents:

1. **Architect** - Project setup & architecture
2. **UI/UX** - Screens & components
3. **Calc Engine** - Financial formulas
4. **Data Storage** - Local DB & persistence
5. **Monetization** - IAP, ads & reports
6. **QA** - Testing & quality assurance

## 🚀 Getting Started

See `specs/architect-spec.md` for detailed implementation plan.

## 📄 License

Private - All rights reserved.
