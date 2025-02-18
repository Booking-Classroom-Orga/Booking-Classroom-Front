export type UserType = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string;
};

export type UserDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
