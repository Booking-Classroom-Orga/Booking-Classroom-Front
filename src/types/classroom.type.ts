export type ClassroomType = {
  id: number;
  name: string;
  capacity: number;
  equipment: string[];
  isAvailable: boolean;
};

export type ClassroomDto = {
  name: string;
  capacity: number;
  equipment: string[];
};
