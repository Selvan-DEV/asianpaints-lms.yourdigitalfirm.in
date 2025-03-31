export interface ICourseModel {
  courseId: number;
  courseName: string;
  description: string;
  createdAt: string;
  courseStatus: string;
  userCourseId: string;
  courseStartedDate: string;
}

export interface ITopic {
  topicId: number;
  topicName: string;
  topicDescription: string;
  courseId: number;
  contentId: string;
  orderNumber: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  assessmentId: number;
}

export interface ITopicContent {
  contentId: number;
  topicId: number;
  contentTitle: string;
  contentBody: string;
  contentType: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}