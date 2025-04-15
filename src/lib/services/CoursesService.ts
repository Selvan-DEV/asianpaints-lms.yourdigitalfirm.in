import { ITopicContent } from "@/models/courses/CoursesModel";
import axiosInstance from "../axiosInstance";

export const getCourses = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`courses/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopicsByCourseId = async (courseId: string) => {
  try {
    const url = `courses/${courseId}/topics`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getContentByTopicId = async (topicId: number): Promise<ITopicContent> => {
  try {
    const url = `topics/${topicId}/content`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startCourse = async (payload: { userId: number; courseId: number }): Promise<{ message: string }> => {
  try {
    const url = `courses/start-course`;
    const response = await axiosInstance.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startAssessment = async (payload: { topicId: number; userId: number; courseId: number; assessmentId: number }): Promise<{ message: string }> => {
  try {
    const url = `users/start-assessment`;
    const response = await axiosInstance.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};