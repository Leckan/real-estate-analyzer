export interface MarketAnalysis {
  currentValue: number;
  pricePerSqFt: number;
  comparableRange: {
    low: number;
    high: number;
  };
}

export interface FixAndFlip {
  totalCosts: number;
  potentialProfit: number;
  timelineMonths: number;
  roi: number;
}

export interface RentalStrategy {
  monthlyIncome: number;
  operatingExpenses: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
}

export interface PropertyInsights {
  strengths: string[];
  considerations: string[];
  recommendation: string;
}

export interface MarketTrends {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

export interface PropertyAnalysis {
  marketAnalysis: MarketAnalysis;
  fixAndFlip: FixAndFlip;
  rentalStrategy: RentalStrategy;
  propertyInsights: PropertyInsights;
  marketTrends: MarketTrends;
}
