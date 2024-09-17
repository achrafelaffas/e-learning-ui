import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import QuizChart from "./QuizChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CouresList = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Vos cours</CardTitle>
        <CardDescription>La liste de vos cours</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Matiere</TableHead>
              <TableHead className="text-right">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={1}>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Probabilite</TableCell>
              <TableCell>Math</TableCell>
              <TableCell className="text-right">100 DH</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CouresList;
