import { Card } from '../ui/Card';
import { StatDisplay } from '../ui/StatDisplay';
import { formatCurrency, formatPercentage, getColorByValue } from '@/app/utils/formatters';
import type { FixAndFlip } from '@/app/types/analysis';

interface FixAndFlipAnalysisProps {
  analysis: FixAndFlip;
}

export function FixAndFlipAnalysis({ analysis }: FixAndFlipAnalysisProps) {
  return (
    <Card title="Fix & Flip Analysis">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatDisplay
          label="Total Investment"
          value={formatCurrency(analysis.totalCosts)}
        />
        <StatDisplay
          label="Potential Profit"
          value={formatCurrency(analysis.potentialProfit)}
          valueClassName={getColorByValue(analysis.potentialProfit)}
        />
        <StatDisplay
          label="Timeline"
          value={analysis.timelineMonths.toString()}
          subValue="months"
        />
        <StatDisplay
          label="Return on Investment"
          value={formatPercentage(analysis.roi)}
          valueClassName={getColorByValue(analysis.roi)}
        />
      </div>
    </Card>
  );
}
