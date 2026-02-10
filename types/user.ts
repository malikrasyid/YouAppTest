export interface UserProfile {
    name: string;
    birthday: string; 
    height: number;
    weight: number;
    interests?: string[];
}
  
export interface RegisterDto {
    email: string;
    username: string;
    password?: string; 
}
  
export type CreateUserDto = UserProfile;
export type UpdateUserDto = UserProfile;
  
export interface LoginDto {
    email?: string;
    username?: string;
    password?: string;
}
  
export interface AuthResponse {
    message: string;
    access_token?: string;
}