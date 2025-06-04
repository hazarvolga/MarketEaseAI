
"use client";

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";
import { Skeleton } from '@/components/ui/skeleton';

const fixedChartDemoData = [
  { name: 'Jan', uv: 400, pv: 240 },
  { name: 'Feb', uv: 300, pv: 139 },
  { name: 'Mar', uv: 200, pv: 980 },
  { name: 'Apr', uv: 278, pv: 390 },
  { name: 'May', uv: 189, pv: 480 },
];

interface FixedDimensionsDemoChartProps {
  width: number;
  height: number;
}

const FixedDimensionsDemoChart: React.FC<FixedDimensionsDemoChartProps> = ({ width, height }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div style={{ width: `${width}px`, height: `${height}px` }} className="mx-auto bg-background p-2 rounded-md shadow flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className="mx-auto bg-background p-2 rounded-md shadow">
      <RechartsBarChart data={fixedChartDemoData} width={width} height={height} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={10} />
        <YAxis fontSize={10} />
        <RechartsTooltip wrapperStyle={{fontSize: '12px'}}/>
        <RechartsLegend wrapperStyle={{fontSize: '10px'}} />
        <Bar dataKey="pv" fill="hsl(var(--chart-1))" name="Page Views" radius={[4, 4, 0, 0]} />
        <Bar dataKey="uv" fill="hsl(var(--chart-2))" name="Unique Visitors" radius={[4, 4, 0, 0]}/>
      </RechartsBarChart>
    </div>
  );
};

export default FixedDimensionsDemoChart;
