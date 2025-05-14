
import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`data-card ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="data-card-title">{title}</p>
          <p className="data-card-value">{value}</p>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      {trend && (
        <div
          className={`mt-2 flex items-center text-xs ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <span>{trend.isPositive ? '↑' : '↓'} </span>
          <span className="ml-0.5">
            {trend.value}% {trend.isPositive ? '增长' : '下降'}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
