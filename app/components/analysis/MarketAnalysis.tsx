import { Card } from '../ui/Card';
import { StatDisplay } from '../ui/StatDisplay';
import { formatCurrency, formatPricePerSqFt } from '@/app/utils/formatters';
import type { MarketAnalysis as MarketAnalysisType } from '@/app/types/analysis';

interface MarketAnalysisProps {
  analysis: MarketAnalysisType;
}

export function MarketAnalysis({ analysis }: MarketAnalysisProps) {
  return (
    <Card title="Market Analysis">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatDisplay
          label="Current Market Value"
          value={formatCurrency(analysis.currentValue)}
        />
        <StatDisplay
          label="Price per Square Foot"
          value={formatPricePerSqFt(analysis.pricePerSqFt)}
        />
        <StatDisplay
          label="Comparable Range"
          value={formatCurrency(analysis.comparableRange.low)}
          subValue={`to ${formatCurrency(analysis.comparableRange.high)}`}
        />
      </div>
    </Card>
  );
}
