export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  status: {
    code: number;
    message: string;
  };
  data: User;
}

export interface AuthError {
  status: {
    message: string;
  };
}