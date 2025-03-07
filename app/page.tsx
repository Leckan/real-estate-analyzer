'use client';

import { useState } from 'react';
import { PropertyForm } from './components/forms/PropertyForm';
import { AnalysisResults } from './components/analysis/AnalysisResults';
import { HomeIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import type { PropertyAnalysis } from './types/analysis';
import type { PropertyData } from './components/forms/PropertyForm';

export default function Home() {
  const [analysis, setAnalysis] = useState<PropertyAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: PropertyData) => {
    try {
      setLoading(true);
      setError(null);
      setAnalysis(null); // Clear previous analysis

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze property');
      }
      
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HomeIcon className="h-8 w-8 text-blue-600" />
            <ChartBarIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Real Estate Investment Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make data-driven investment decisions with AI-powered analysis for fix & flip and rental strategies
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Property Form Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              Property Details
              {loading && (
                <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
              )}
            </h2>
            <PropertyForm onSubmit={handleAnalyze} loading={loading} />
          </section>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slideIn">
              <p className="text-red-800 flex items-center gap-2">
                <span className="font-medium">Analysis Error:</span> {error}
              </p>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <section className="transition-all duration-500 ease-in-out animate-fadeIn">
              <AnalysisResults analysis={analysis} />
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p> {new Date().getFullYear()} Real Estate Investment Analyzer. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
