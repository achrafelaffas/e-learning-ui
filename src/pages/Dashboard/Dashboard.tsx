import { Configuration, ProgressPerCoursDTO, StatistiqueRestApi } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect, useState } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");
  const api = new StatistiqueRestApi(config);

  const [progress, setProgress] = useState<ProgressPerCoursDTO[]>([]);

  const getProgressPerCours = async () => {
    await api.getProgressPerCours().then(
      (response) => {
        setProgress(response.data);
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    getProgressPerCours();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h1>Your Progress</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Cours</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.map((p) => (
                <TableRow>
                  <TableCell>{p.cours?.titre}</TableCell>
                  <TableCell>{p.progress}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h1>Current Courses</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Cours</TableHead>
                <TableHead>Matieres</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.map((p) => (
                <TableRow>
                  <TableCell>{p.cours?.titre}</TableCell>
                  <TableCell>{p.cours?.matiere?.nom}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
