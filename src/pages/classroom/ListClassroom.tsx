import ButtonWithAlert from "@/components/custom-ui/classrooms/button-with-alert";
import CreateDialog from "@/components/custom-ui/classrooms/create-dialog";
import UpdateDialog from "@/components/custom-ui/classrooms/edit-dialog";
import CustomSidebar from "@/components/custom-ui/custom-sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { findAll } from "@/services/classroom.service";
import { ClassroomType } from "@/types/classroom.type";
import { useEffect, useState } from "react";

const ListClassroom = () => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);

  const fetchClassrooms = async () => {
    try {
      const data = await findAll();
      setClassrooms(data);
      console.log("Classrooms fetched:", data);
    } catch (error) {
      console.error("Failed to fetch classrooms:", error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <>
      <CustomSidebar />
      <div className="flex flex-col p-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Classrooms</h1>
          <CreateDialog onCreate={fetchClassrooms} />
        </div>
        <Accordion type="single" collapsible>
          {classrooms.map((classroom) => (
            <AccordionItem key={classroom.id} value={`item-${classroom.id}`}>
              <AccordionTrigger>{classroom.name}</AccordionTrigger>
              <AccordionContent className="flex space-x-4">
                <Button variant="secondary">More</Button>
                <UpdateDialog id={classroom.id} onUpdate={fetchClassrooms} />
                <ButtonWithAlert id={classroom.id} onDelete={fetchClassrooms} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default ListClassroom;
