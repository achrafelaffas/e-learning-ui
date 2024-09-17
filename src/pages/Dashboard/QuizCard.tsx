import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import QuizChart from "./QuizChart";

const MarksCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Quizs Scores</CardTitle>
        <CardDescription>Your score in the quizes you took</CardDescription>
      </CardHeader>
      <CardContent>
        <QuizChart/>
      </CardContent>
    </Card>
  );
};

export default MarksCard;
