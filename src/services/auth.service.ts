import { UserDto } from "../types/user.type";

export const API_URL = "http://localhost:8000/api";

export const authentification = async (user: UserDto) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("User not registered");
  }
  const data = await response.json();
  localStorage.setItem("token", data.accessToken);

  return data;
};

export const register = async (user: UserDto) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  const data = await response.json();
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
