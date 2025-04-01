"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";

// API Simulation (Replace with your real API)
const fetchQuestions = async () => {
  return [
    {
      id: 1,
      question: "What is the world's largest continent?",
      type: "single", // "single" or "multiple"
      options: ["Asia", "Africa", "North America", "Antarctica", "Australia"],
    },
    {
      id: 2,
      question: "Select the correct options:",
      type: "multiple",
      options: ["Option 1", "Option 2"],
    },
  ];
};

const Assessment = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<
    { id: number; question: string; type: string; options: string[] }[]
  >([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    useUIStore.getState().setBreadCrumbShowStatus(false);

    return () => {
      useUIStore.getState().setBreadCrumbShowStatus(true);
    };
  }, []);

  const validationSchema = Yup.object().shape({
    answers: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required(),
        response: Yup.mixed().test(
          "required",
          "Please select an answer",
          function (value) {
            const question = questions.find((q) => q.id === this.parent.id);
            return question?.type === "multiple"
              ? (value as any[])?.length > 0
              : !!value;
          }
        ),
      })
    ),
  });

  const initialValues = {
    answers: questions.map((q) => ({
      id: q.id,
      response: q.type === "multiple" ? [] : "",
    })),
  };

  const handleNext = (values: any): void => {
    console.log("Final Submission:", values);
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <Box sx={{ width: "50%" }}>
      <Typography variant="h5" fontWeight="bold">
        Let&apos;s check your Geography
      </Typography>
      <Typography variant="body2" color="gray">
        Choose the right answers
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleNext}
      >
        {({ touched }) => (
          <Form>
            <FieldArray name="answers">
              {() =>
                questions.map((q, index) => (
                  <Box key={q.id} sx={{ mt: 2 }}>
                    <Typography fontWeight="bold">{q.question}</Typography>

                    {q.type === "single" ? (
                      <Field name={`answers[${index}].response`}>
                        {({ field }: any) => (
                          <FormControl
                            error={touched.answers?.[index]?.response}
                          >
                            <RadioGroup {...field}>
                              {q.options.map((option, i) => (
                                <FormControlLabel
                                  key={i}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                            <FormHelperText>
                              {touched.answers?.[index]?.response}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    ) : (
                      <Field name={`answers[${index}].response`}>
                        {({ field }: any) => (
                          <FormControl
                            error={touched.answers?.[index]?.response}
                          >
                            {q.options.map((option, i) => (
                              <FormControlLabel
                                key={i}
                                control={
                                  <Checkbox
                                    checked={field.value.includes(option)}
                                    onChange={() => {
                                      if (field.value.includes(option)) {
                                        field.onChange({
                                          target: {
                                            name: field.name,
                                            value: field.value.filter(
                                              (v: any) => v !== option
                                            ),
                                          },
                                        });
                                      } else {
                                        field.onChange({
                                          target: {
                                            name: field.name,
                                            value: [...field.value, option],
                                          },
                                        });
                                      }
                                    }}
                                  />
                                }
                                label={option}
                              />
                            ))}
                            <FormHelperText>
                              {touched.answers?.[index]?.response}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    )}
                  </Box>
                ))
              }
            </FieldArray>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mt: 4,
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => router.push("/")}
              >
                Go to Home
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => router.push("/")}
              >
                Save as Draft
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Assessment;
