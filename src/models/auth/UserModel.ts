export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserRegistration extends User {
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface IForgotPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
