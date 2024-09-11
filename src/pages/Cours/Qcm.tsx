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

const quizQuestions = [
  {
    question: "What is React?",
    answers: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "An operating system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    answers: ["color", "text-color", "font-color", "text-style"],
    correctAnswer: "color",
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question:
      "Which JavaScript method is used to remove the last element from an array?",
    answers: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: "pop()",
  },
  {
    question: "What is the purpose of CSS media queries?",
    answers: [
      "To create responsive designs",
      "To add interactivity to web pages",
      "To define custom fonts",
      "To optimize database queries",
    ],
    correctAnswer: "To create responsive designs",
  },
];

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
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
          <CardTitle>Web Development Quiz</CardTitle>
          <CardDescription>Test your web development knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          {showScore ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-xl mb-4">
                You scored {score} out of {quizQuestions.length}
              </p>
              <Progress
                value={(score / quizQuestions.length) * 100}
                className="w-full h-2 mb-2"
              />
              <p className="text-sm text-gray-500">
                {(score / quizQuestions.length) * 100}% correct
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  Question {currentQuestion + 1} of {quizQuestions.length}
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
                    <RadioGroupItem value={answer} id={`answer-${index}`} />
                    <Label htmlFor={`answer-${index}`}>{answer}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          )}
        </CardContent>
        <CardFooter>
          {showScore ? (
            <Button onClick={restartQuiz} className="w-full">
              Restart Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
              disabled={!selectedAnswer}
            >
              {currentQuestion === quizQuestions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
