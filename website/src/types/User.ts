export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    photo: File | null;
  }
  
  export interface UserAuthResponse {
    token: string | undefined;
    user: User;
  }
  