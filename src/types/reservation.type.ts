import { ClassroomType } from "./classroom.type";

export type ReservationType = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  classroomId: [ClassroomType];
};

export type ReservationDto = {
  date: string;
  startTime: string;
  endTime: string;
  classroomId: [ClassroomType];
};
