import { ClassroomType } from "./classroom.type";
import {UserType} from "@/types/user.type.ts";

export type ReservationType = {
  id: number;
  user: [UserType];
  date: string;
  startTime: string;
  endTime: string;
  classroom: [ClassroomType];
};

export type ReservationDto = {
  user: [UserType];
  date: string;
  startTime: string;
  endTime: string;
  classroom: [ClassroomType];
};
