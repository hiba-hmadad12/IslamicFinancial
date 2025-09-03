export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
    role?: string; // admin ou client (optionnel si backend gère automatiquement)
  }
  
  export interface SignInRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    userId?: number;
    role?: string;
  }
  