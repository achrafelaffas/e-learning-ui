import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { QuizDTO } from "@/api";

interface QuizProps {
  quiz: QuizDTO | null;
}

interface QuizQuestion {
  question: string;
  answers: { text: string; isCorrect: boolean }[];
}

export default function Quiz({ quiz }: QuizProps) {

  // Prepare quiz questions with fallbacks for missing values
  const quizQuestions: QuizQuestion[] = quiz?.questions
    ? quiz.questions
        .map((data) => ({
          question: data?.enonce || "", // default to an empty string if undefined
          answers: data?.reponses?.map((answer) => ({
            text: answer?.texte || "", // default to an empty string if undefined
            isCorrect: answer?.estCorrect ?? false, // default to false if undefined
          })) || [], // default to an empty array if undefined
        }))
        .filter((q) => q.question && q.answers.length > 0) // Filter out any incomplete questions or answers
    : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const isCorrectAnswer = quizQuestions[currentQuestion].answers.find(
      (answer) => answer.text === selectedAnswer && answer.isCorrect
    );

    if (isCorrectAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer("");
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer("");
  };

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>{quiz?.titre || "Quiz"}</CardTitle>
          <CardDescription>Testez vos connaissances</CardDescription>
        </CardHeader>
        <CardContent>
          {quizQuestions.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Aucune question disponible</h2>
              <p className="text-gray-500">Ce quiz ne contient pas de questions pour le moment.</p>
            </div>
          ) : showScore ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Terminé !</h2>
              <p className="text-xl mb-4">
                Vous avez obtenu {score} sur {quizQuestions.length}
              </p>
              <Progress
                value={(score / quizQuestions.length) * 100}
                className="w-full h-2 mb-2"
              />
              <p className="text-sm text-gray-500">
                {((score / quizQuestions.length) * 100).toFixed(2)}% correct
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  Question {currentQuestion + 1} sur {quizQuestions.length}
                </p>
                <Progress
                  value={((currentQuestion + 1) / quizQuestions.length) * 100}
                  className="w-full h-2"
                />
              </div>
              <h2 className="text-lg font-semibold mb-4">
                {quizQuestions[currentQuestion].question}
              </h2>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleAnswerSelect}
              >
                {quizQuestions[currentQuestion].answers.map((answer, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={answer.text} id={`answer-${index}`} />
                    <Label htmlFor={`answer-${index}`}>{answer.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </CardContent>
        <CardFooter>
          {showScore ? (
            <Button onClick={restartQuiz} className="w-full">
              Recommencer le quiz
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
              disabled={!selectedAnswer}
            >
              {currentQuestion === quizQuestions.length - 1
                ? "Terminer le quiz"
                : "Question suivante"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
