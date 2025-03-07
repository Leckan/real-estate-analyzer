interface StatDisplayProps {
  label: string;
  value: string;
  subValue?: string;
  className?: string;
  valueClassName?: string;
}

export function StatDisplay({ label, value, subValue, className = '', valueClassName = '' }: StatDisplayProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={`text-2xl font-semibold ${valueClassName || 'text-gray-900'}`}>
        {value}
        {subValue && (
          <span className="text-sm font-normal text-gray-500 ml-1">{subValue}</span>
        )}
      </p>
    </div>
  );
}
