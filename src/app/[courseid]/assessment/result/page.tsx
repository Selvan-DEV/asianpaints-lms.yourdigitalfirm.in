"use client";

import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useUIStore } from "@/store/useUIStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface QuestionResult {
  question: string;
  correctAnswer: string;
  userAnswer?: string;
  isCorrect: boolean;
}

interface QuizResultProps {
  employeeName: string;
  employeeId: string;
  quizName: string;
  dateTaken: string;
  totalScore: number;
  maxScore: number;
  questions: QuestionResult[];
  overallFeedback: string;
  recommendations: string;
}

const QuizResult: React.FC<QuizResultProps> = ({
  employeeName,
  employeeId,
  quizName,
  dateTaken,
  totalScore,
  maxScore,
  questions,
  overallFeedback,
  recommendations,
}) => {
  const pass = totalScore >= maxScore * 0.7; // Assuming 70% is passing
  const router = useRouter();

  useEffect(() => {
    useUIStore.getState().setBreadCrumbShowStatus(false);

    return () => {
      useUIStore.getState().setBreadCrumbShowStatus(true);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        delay: 0.2,
        type: "tween",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          style={{ padding: "20px", textAlign: "center", width: "100%" }}
        >
          <Typography variant="h4" gutterBottom>
            Quiz Result for Employee
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={`Employee Name: ${employeeName}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={`Employee ID: ${employeeId}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={`Quiz Name: ${quizName}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary={`Date Taken: ${dateTaken}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={`Total Score: ${totalScore} / ${maxScore}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {pass ? (
                  <CheckCircleIcon style={{ color: "green" }} />
                ) : (
                  <CancelIcon style={{ color: "red" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={`Pass/Fail: ${pass ? "Pass" : "Fail"}`} />
            </ListItem>
          </List>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h5" gutterBottom>
            Detailed Results:
          </Typography>

          <List>
            {questions.map((question, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Question ${index + 1}: ${question.question}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Correct Answer: ${question.correctAnswer}`}
                  />
                </ListItem>
                {question.userAnswer && (
                  <ListItem>
                    <ListItemText
                      primary={`Your Answer: ${question.userAnswer}`}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemIcon>
                    {question.isCorrect ? (
                      <CheckCircleIcon style={{ color: "green" }} />
                    ) : (
                      <CancelIcon style={{ color: "red" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={`Status: ${
                      question.isCorrect ? "Correct" : "Incorrect"
                    }`}
                  />
                </ListItem>
                <Divider style={{ margin: "10px 0" }} />
              </div>
            ))}
          </List>

          <Divider style={{ margin: "20px 0" }} />

          <Typography variant="h5" gutterBottom>
            Overall Feedback:
          </Typography>
          <Typography paragraph>{overallFeedback}</Typography>

          <Typography variant="h5" gutterBottom>
            Recommendations:
          </Typography>
          <Typography paragraph>{recommendations}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              type="button"
              onClick={() => router.push("/")}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </motion.div>
  );
};

const QuizResultPage = () => {
  const mockData: QuizResultProps = {
    employeeName: "Alice Johnson",
    employeeId: "EMP002",
    quizName: "Software Development Best Practices",
    dateTaken: "2023-10-27",
    totalScore: 7,
    maxScore: 10,
    questions: [
      {
        question: "What is the SOLID principle for single responsibility?",
        correctAnswer: "S",
        userAnswer: "S",
        isCorrect: true,
      },
      {
        question: "Which design pattern promotes loose coupling?",
        correctAnswer: "Dependency Injection",
        userAnswer: "Factory",
        isCorrect: false,
      },
      {
        question: "What does DRY stand for?",
        correctAnswer: "Don't Repeat Yourself",
        userAnswer: "Don't Repeat Yourself",
        isCorrect: true,
      },
      {
        question: "Is refactoring done before adding new features?",
        correctAnswer: "No",
        userAnswer: "Yes",
        isCorrect: false,
      },
      {
        question: "What is the purpose of unit testing?",
        correctAnswer: "Test individual units of code",
        userAnswer: "Test individual units of code",
        isCorrect: true,
      },
      {
        question: "Is it recommended to commit commented out code?",
        correctAnswer: "No",
        userAnswer: "No",
        isCorrect: true,
      },
      {
        question: "What is the primary benefit of version control?",
        correctAnswer: "Track changes and collaborate",
        userAnswer: "Track changes and collaborate",
        isCorrect: true,
      },
      {
        question: "What is the best type of comment",
        correctAnswer: "Self documenting code",
        userAnswer: "Self documenting code",
        isCorrect: true,
      },
      {
        question: "What is the purpose of code reviews?",
        correctAnswer: "Improve code quality",
        userAnswer: "Improve code quality",
        isCorrect: true,
      },
      {
        question: "What does CI/CD stand for?",
        correctAnswer: "Continuous Integration / Continuous Deployment",
        userAnswer: "Continuous Integration / Continuous Deployment",
        isCorrect: true,
      },
    ],
    overallFeedback:
      "Alice, you performed well overall, demonstrating a good understanding of software development best practices.",
    recommendations:
      "Please review the section on design patterns, particularly Dependency Injection, to improve your understanding.",
  };

  return <QuizResult {...mockData} />;
};

export default QuizResultPage;
