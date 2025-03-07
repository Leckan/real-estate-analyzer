import { MarketAnalysis } from './MarketAnalysis';
import { FixAndFlipAnalysis } from './FixAndFlipAnalysis';
import { RentalAnalysis } from './RentalAnalysis';
import { MarketTrends } from './MarketTrends';
import { PropertyInsights } from './PropertyInsights';
import type { PropertyAnalysis } from '@/app/types/analysis';

interface AnalysisResultsProps {
  analysis: PropertyAnalysis;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Market Analysis */}
      <MarketAnalysis analysis={analysis.marketAnalysis} />

      {/* Investment Strategy Analysis */}
      <div className="grid grid-cols-1 gap-8">
        <FixAndFlipAnalysis analysis={analysis.fixAndFlip} />
        <RentalAnalysis analysis={analysis.rentalStrategy} />
      </div>

      {/* Market Trends */}
      <MarketTrends data={analysis.marketTrends} />

      {/* Property Insights */}
      <PropertyInsights insights={analysis.propertyInsights} />
    </div>
  );
}
