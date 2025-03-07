'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export interface PropertyData {
  address: string;
  price: number;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  propertyType: string;
  repairCost: number;
  targetRent: number;
}

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
  loading: boolean;
}

export function PropertyForm({ onSubmit, loading }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyData>({
    address: '',
    price: 0,
    squareFeet: 0,
    bedrooms: 0,
    bathrooms: 0,
    yearBuilt: 0,
    propertyType: '',
    repairCost: 0,
    targetRent: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'address' || name === 'propertyType' ? value : Number(value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Property Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Investment Ave, San Jose, CA 95123"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            value={formData.price || ''}
            onChange={handleChange}
            placeholder="650000"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Square Feet */}
        <div>
          <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-1">
            Square Feet
          </label>
          <input
            type="number"
            id="squareFeet"
            name="squareFeet"
            required
            min="0"
            value={formData.squareFeet || ''}
            onChange={handleChange}
            placeholder="1400"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            required
            min="0"
            value={formData.bedrooms || ''}
            onChange={handleChange}
            placeholder="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            required
            min="0"
            step="0.5"
            value={formData.bathrooms || ''}
            onChange={handleChange}
            placeholder="2"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Year Built */}
        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">
            Year Built
          </label>
          <input
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            required
            min="1800"
            max={new Date().getFullYear()}
            value={formData.yearBuilt || ''}
            onChange={handleChange}
            placeholder="1985"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Property Type */}
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            required
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select type...</option>
            <option value="Single Family">Single Family</option>
            <option value="Multi Family">Multi Family</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        {/* Repair Costs */}
        <div>
          <label htmlFor="repairCost" className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Repair Costs ($)
          </label>
          <input
            type="number"
            id="repairCost"
            name="repairCost"
            required
            min="0"
            value={formData.repairCost || ''}
            onChange={handleChange}
            placeholder="75000"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Target Rent */}
        <div>
          <label htmlFor="targetRent" className="block text-sm font-medium text-gray-700 mb-1">
            Target Monthly Rent ($)
          </label>
          <input
            type="number"
            id="targetRent"
            name="targetRent"
            required
            min="0"
            value={formData.targetRent || ''}
            onChange={handleChange}
            placeholder="3200"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Analyzing...
            </>
          ) : (
            'Analyze Investment Potential'
          )}
        </button>
      </div>
    </form>
  );
}
