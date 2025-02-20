import { EquipmentType } from "./equipment.type";

export type ClassroomType = {
  id: number;
  name: string;
  capacity: number;
  equipment: EquipmentType[];
  isAvailable: boolean;
};

export type ClassroomDto = {
  name: string;
  capacity: number;
  equipment: EquipmentType[];
};
