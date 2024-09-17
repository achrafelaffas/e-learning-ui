import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { module: "Math", score: 186 },
  { module: "Frensh", score: 305 },
  { module: "Algorithms", score: 237 },
  { module: "Web Dev", score: 73 },
  { module: "Java", score: 209 },
  { module: "Networks", score: 214 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function QuizChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[50px] h-[260px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="module"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="score" fill="var(--color-score)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
