import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";

interface ChartData {
  matiere: String;
  progress: number;
  fill: string;
}

const chartConfig = {
  progress: {
    label: "progress",
  },
} satisfies ChartConfig;

const ProgressPerMatiereChart = ({ idEtud }: { idEtud: number }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const api = useApi();

  const getProgressPerMatiere = async (id: number) => {
    await api.userRestApi.etudiantProgressPerMatiere(id).then(
      (response) => {
        const chartData: ChartData[] = response.data.map((p) => ({
          matiere: p.matiere?.nom || "",
          progress: p.progress || 0,
          fill: `hsl(var(--chart-3))`,
        }));
        setChartData(chartData);
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    getProgressPerMatiere(idEtud);
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Progrès par matière</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="matiere"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="progress"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressPerMatiereChart;
