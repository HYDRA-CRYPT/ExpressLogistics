import React from "react";
import { CheckCircle, Package, DollarSign, Box } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: "package" | "weight" | "value" | "items";
  stats?: Array<{
    label: string;
    value: string | number;
    color: string;
    icon?: React.ReactNode;
  }>;
}

const iconMap = {
  package: CheckCircle,
  weight: Package,
  value: DollarSign,
  items: Box,
};

const colorMap = {
  package: "text-gray-400",
  weight: "text-blue-400",
  value: "text-green-400",
  items: "text-purple-400",
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  stats,
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/70 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
          <div className="text-2xl font-bold text-white">{value}</div>
          {subtitle && <p className="text-zinc-400 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg bg-zinc-700/50 ${colorMap[icon]}`}>
          <IconComponent size={24} />
        </div>
      </div>

      {stats && (
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {stat.icon}
                <span className="text-zinc-300 text-sm">{stat.label}</span>
              </div>
              <span className={`text-sm font-semibold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
