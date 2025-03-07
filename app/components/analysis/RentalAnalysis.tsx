import { Card } from '../ui/Card';
import { StatDisplay } from '../ui/StatDisplay';
import { formatCurrency, formatPercentage, getColorByValue } from '@/app/utils/formatters';
import type { RentalStrategy } from '@/app/types/analysis';

interface RentalAnalysisProps {
  analysis: RentalStrategy;
}

export function RentalAnalysis({ analysis }: RentalAnalysisProps) {
  return (
    <Card title="Rental Strategy">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatDisplay
          label="Monthly Income"
          value={formatCurrency(analysis.monthlyIncome)}
          valueClassName={getColorByValue(analysis.monthlyIncome)}
        />
        <StatDisplay
          label="Operating Expenses"
          value={formatCurrency(analysis.operatingExpenses)}
          valueClassName={getColorByValue(-analysis.operatingExpenses)}
        />
        <StatDisplay
          label="Net Operating Income"
          value={formatCurrency(analysis.netOperatingIncome)}
          subValue="/ year"
          valueClassName={getColorByValue(analysis.netOperatingIncome)}
        />
        <StatDisplay
          label="Cap Rate"
          value={formatPercentage(analysis.capRate)}
          valueClassName={getColorByValue(analysis.capRate, 5)}
        />
        <StatDisplay
          label="Cash on Cash Return"
          value={formatPercentage(analysis.cashOnCashReturn)}
          valueClassName={getColorByValue(analysis.cashOnCashReturn, 8)}
        />
      </div>
    </Card>
  );
}
