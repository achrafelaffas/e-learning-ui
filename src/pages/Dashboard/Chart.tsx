import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { MatiereDTO } from "@/api";
import useApi from "@/hooks/useApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartData {
  cours: String;
  progress: number;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [matieres, setMatieres] = useState<MatiereDTO[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const api = useApi();

  const fetchMatieres = async () => {
    try {
      const response = await api.matiereApi.getAllMatieres();
      const matieres = response.data;
      setMatieres(matieres);
    } catch {
      console.log("Error happend!");
    }
  };

  const getProgressPerCours = async (id: number) => {
    await api.statistiqueRestApi.getProgressPerCours(id).then(
      (response) => {
        const chartData: ChartData[] = response.data.map((p) => ({
          cours: p.cours?.titre || "",
          progress: p.progress || 0,
        }));

        setChartData(chartData);
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  useEffect(() => {
    if (matieres && matieres.length > 0) {
      const firstItemId = matieres[0].id!.toString();
      setSelectedValue(firstItemId);
      getProgressPerCours(Number(firstItemId));
      console.log(selectedValue);
    }
  }, [matieres]);

  return (
    <Card className="p-1 h-full">
      <CardHeader className="flex flex-row justify-between gap-2">
        <div className="w-2/3">
          <CardTitle className="">Progrès par cours</CardTitle>
        </div>

        <Select
          onValueChange={(e) => {
            getProgressPerCours(Number(e));
          }}
          defaultValue={selectedValue}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Matières" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {matieres.map((m) => (
                <SelectItem key={m.id} value={m.id!.toString()}>
                  {m.nom}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="cours" className="hidden" />
            <PolarGrid gridType="circle" radialLines={false} />
            <Radar
              dataKey="progress"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
