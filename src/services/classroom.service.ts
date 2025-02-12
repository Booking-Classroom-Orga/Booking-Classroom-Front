import { ClassroomDto } from "../types/classroom.type";

export const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const findAll = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/classrooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log("data", data);
  return data;
};

export const findById = async (id: number) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/classrooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const create = async (classroom: ClassroomDto) => {
  const response = await fetch(`${API_URL}/classrooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(classroom),
  });
  const data = await response.json();
  console.log("Create classroom", data);
  return data;
};

export const update = async (id: number, classroom: ClassroomDto) => {
  const response = await fetch(`${API_URL}/classrooms/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(classroom),
  });
  const data = await response.json();
  return data;
};

export const remove = async (id: number) => {
  const response = await fetch(`${API_URL}/classrooms/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
