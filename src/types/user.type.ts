export type UserType = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  roles: string;
};

export type UserDto = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};
