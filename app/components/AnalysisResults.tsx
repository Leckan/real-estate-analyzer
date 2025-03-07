'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { formatCurrency } from '../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface AnalysisResultsProps {
  analysis: {
    marketAnalysis: {
      currentValue: number;
      pricePerSqFt: number;
      comparableRange: {
        low: number;
        high: number;
      };
    };
    fixAndFlip: {
      totalCosts: number;
      potentialProfit: number;
      timelineMonths: number;
      roi: number;
    };
    rentalStrategy: {
      monthlyIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      capRate: number;
      cashOnCashReturn: number;
    };
    propertyInsights: {
      strengths: string[];
      considerations: string[];
      recommendation: string;
    };
    marketTrends: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
      }[];
    };
  };
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      {/* Market Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Market Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Current Value</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.marketAnalysis.currentValue)}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Price per Sq Ft</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.marketAnalysis.pricePerSqFt)}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Comparable Range</p>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(analysis.marketAnalysis.comparableRange.low)} - {formatCurrency(analysis.marketAnalysis.comparableRange.high)}
            </p>
          </div>
        </div>
      </div>

      {/* Fix & Flip Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Fix & Flip Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Investment</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.fixAndFlip.totalCosts)}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">Potential Profit</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.fixAndFlip.potentialProfit)}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">Timeline</p>
            <p className="text-xl font-semibold text-gray-900">{analysis.fixAndFlip.timelineMonths} months</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">ROI</p>
            <p className="text-xl font-semibold text-gray-900">{analysis.fixAndFlip.roi.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* Rental Strategy */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rental Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Monthly Income</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.rentalStrategy.monthlyIncome)}</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Operating Expenses</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.rentalStrategy.operatingExpenses)}</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Net Operating Income (Annual)</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(analysis.rentalStrategy.netOperatingIncome)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Cap Rate</p>
            <p className="text-xl font-semibold text-gray-900">{analysis.rentalStrategy.capRate.toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Cash on Cash Return</p>
            <p className="text-xl font-semibold text-gray-900">{analysis.rentalStrategy.cashOnCashReturn.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Market Trends</h3>
        <div className="h-[300px]">
          <Line data={analysis.marketTrends} options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: false,
                ticks: {
                  callback: (value) => formatCurrency(value as number),
                },
              },
            },
          }} />
        </div>
      </div>

      {/* Property Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Property Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Strengths</h4>
            <ul className="list-disc list-inside space-y-1">
              {analysis.propertyInsights.strengths.map((strength, index) => (
                <li key={index} className="text-gray-600">{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Considerations</h4>
            <ul className="list-disc list-inside space-y-1">
              {analysis.propertyInsights.considerations.map((consideration, index) => (
                <li key={index} className="text-gray-600">{consideration}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendation</h4>
          <p className="text-gray-600">{analysis.propertyInsights.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
