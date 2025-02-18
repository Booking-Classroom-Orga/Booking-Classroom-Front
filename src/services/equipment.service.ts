import { EquipmentDto } from "@/types/equipment.type";

export const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const findAll = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/equipments`, {
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
  const response = await fetch(`${API_URL}/equipments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const create = async (equipment: EquipmentDto) => {
  const response = await fetch(`${API_URL}/equipments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(equipment),
  });
  const data = await response.json();
  console.log("Create equipment", data);
  return data;
};

export const update = async (id: number, equipment: EquipmentDto) => {
  const response = await fetch(`${API_URL}/equipments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(equipment),
  });
  const data = await response.json();
  return data;
};

export const remove = async (id: number) => {
  const response = await fetch(`${API_URL}/equipments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  return data;
};
