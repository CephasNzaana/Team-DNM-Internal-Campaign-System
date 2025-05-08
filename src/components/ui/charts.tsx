
import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  Area,
  AreaChart as RechartsAreaChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from 'recharts';

import { ChartContainer, ChartTooltipContent } from "./chart"
import { DNM_THEME } from "@/lib/theme";

// Create a more diverse color palette with creamish colors
const EXTENDED_COLORS = {
  primary: DNM_THEME.colors.green,
  secondary: DNM_THEME.colors.yellow,
  tertiary: DNM_THEME.colors.red,
  cream: "#FFF5D6", // Light cream
  softCream: "#FEF7CD", // Soft cream yellow
  warmCream: "#FDE1D3", // Warm cream/peach
  lightGreen: "#8BC34A", // Light green
  darkGreen: "#204020", // Darker green
  softBlue: "#90CAF9", // Soft blue
  softRed: "#FFCDD2", // Soft red
  softPurple: "#D1C4E9", // Soft purple
};

interface ChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  yAxisWidth?: number;
  height?: number;
  className?: string;
  valueFormatter?: (value: number) => string;
  stacked?: boolean;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = [EXTENDED_COLORS.primary, EXTENDED_COLORS.secondary],
  yAxisWidth = 40,
  height = 300,
  valueFormatter = (value: number) => value.toString(),
  stacked = false,
  className,
}: ChartProps) => {
  const chartConfig = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        height={height}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          width={yAxisWidth}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
          tickMargin={8}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value) => valueFormatter(Number(value))}
            />
          )}
        />
        <Legend />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            stackId={stacked ? "stack" : undefined}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export const AreaChart = ({
  data,
  index,
  categories,
  colors = [EXTENDED_COLORS.primary, EXTENDED_COLORS.cream],
  yAxisWidth = 40,
  height = 300,
  valueFormatter = (value: number) => value.toString(),
  className,
}: ChartProps) => {
  const chartConfig = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
        height={height}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={index}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          width={yAxisWidth}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
          tickMargin={8}
        />
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value) => valueFormatter(Number(value))}
            />
          )}
        />
        <Legend />
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={colors[i % colors.length]}
            stroke={colors[i % colors.length]}
            fillOpacity={0.2}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
};

interface PieChartProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  className?: string;
}

export const PieChart = ({
  data,
  index,
  category,
  colors = [
    EXTENDED_COLORS.primary, 
    EXTENDED_COLORS.lightGreen, 
    EXTENDED_COLORS.secondary, 
    EXTENDED_COLORS.softCream, 
    EXTENDED_COLORS.warmCream
  ],
  className,
}: PieChartProps) => {
  const chartConfig = data.reduce((acc, item, i) => {
    acc[item[index]] = {
      label: item[index],
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <Pie
          data={data}
          nameKey={index}
          dataKey={category}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          innerRadius="0%"
          paddingAngle={1}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value, name) => [`${value}`, name!]}
            />
          )}
        />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};

interface PieActiveArcProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  className?: string;
}

// Custom active shape for the pie chart
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
  return (
    <g>
      {/* Use Recharts' Sector component instead of a path with custom props */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={5}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const PieActiveArc = ({
  data,
  index,
  category,
  colors = [
    EXTENDED_COLORS.primary, 
    EXTENDED_COLORS.lightGreen, 
    EXTENDED_COLORS.cream, 
    EXTENDED_COLORS.tertiary, 
    EXTENDED_COLORS.softPurple
  ],
  className,
}: PieActiveArcProps) => {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined);

  const chartConfig = data.reduce((acc, item, i) => {
    acc[item[index]] = {
      label: item[index],
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ChartContainer config={chartConfig} className={className}>
      <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <Pie
          data={data}
          nameKey={index}
          dataKey={category}
          cx="50%"
          cy="50%"
          outerRadius={75}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          innerRadius="40%"
          paddingAngle={1}
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltipContent
              active={active}
              payload={payload}
              formatter={(value, name) => [`${value}`, name!]}
            />
          )}
        />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};
