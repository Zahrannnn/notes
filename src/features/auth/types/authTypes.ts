export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken?: string;
};
