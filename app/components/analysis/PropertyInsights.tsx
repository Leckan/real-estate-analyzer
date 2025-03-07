import { Card } from '../ui/Card';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { PropertyInsights as PropertyInsightsType } from '@/app/types/analysis';

interface PropertyInsightsProps {
  insights: PropertyInsightsType;
}

export function PropertyInsights({ insights }: PropertyInsightsProps) {
  return (
    <Card title="AI-Powered Property Insights">
      <div className="space-y-6">
        {/* Strengths */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Key Strengths</h4>
          <ul className="space-y-2">
            {insights.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Important Considerations</h4>
          <ul className="space-y-2">
            {insights.considerations.map((consideration, index) => (
              <li key={index} className="flex items-start gap-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{consideration}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendation */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">AI Recommendation</h4>
          <p className="text-gray-600">{insights.recommendation}</p>
        </div>
      </div>
    </Card>
  );
}
