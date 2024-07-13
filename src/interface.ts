// src/types/User.ts
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
export interface ErrorMessage {
  message: string;
}
