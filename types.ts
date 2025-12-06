export interface CompanyStats {
  name: string;
  ticker: string;
  country: string; // New field for international support
  description: string;
  
  // Market Data
  stockPrice: string;
  marketCap: string;
  peRatio: number;
  dividendYield: string;
  beta: number; // Volatility measure

  // Income Statement
  revenue: string;
  netIncome: string;
  eps: string; // Earnings Per Share
  grossMargin: string;
  operatingMargin: string;

  // Balance Sheet
  totalAssets: string;
  totalLiabilities: string;
  totalDebt: string;
  cashAndEquivalents: string;
  bookValuePerShare: string;

  // Ratios & Health
  roe: string; // Return on Equity
  currentRatio: number; // Liquidity
  debtToEquity: number;
  
  // Market Position
  marketSharePercent: number; // For visualization
  employees: string;
}

export interface HistoricalOutcome {
  winnerTicker: string;
  percentageGrowthA: number;
  percentageGrowthB: number;
  explanation: string;
  stockPriceHistoryA: { year: string; price: number }[];
  stockPriceHistoryB: { year: string; price: number }[];
}

export interface GameScenario {
  year: number;
  theme: string;
  sector: string; // The industry sector
  companyA: CompanyStats;
  companyB: CompanyStats;
  outcome: HistoricalOutcome;
}

export enum GameState {
  INTRO = 'INTRO',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}