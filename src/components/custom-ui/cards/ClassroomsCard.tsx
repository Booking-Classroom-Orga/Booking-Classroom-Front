import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { School } from "lucide-react";
import ButtonWithAlert from "@/components/custom-ui/button-with-alert";
import UpdateDialog from "@/components/custom-ui/edit-dialog";
import { useEffect, useState } from "react";
import { findAll } from "@/services/classroom.service";
import { ClassroomType } from "@/types/classroom.type";
import CreateDialog from "../create-dialog";

const ClassroomsCard = () => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await findAll();
        setClassrooms(data);
        console.log("Classrooms fetched:", data);
      } catch (error) {
        console.error("Failed to fetch classrooms:", error);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold flex items-center">
            <School className="w-5 h-5 mr-2" /> Classrooms
          </CardTitle>
          <CreateDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {classrooms.map((classroom) => (
            <AccordionItem key={classroom.id} value={`item-${classroom.id}`}>
              <AccordionTrigger>{classroom.name}</AccordionTrigger>
              <AccordionContent className="flex justify-end space-x-4">
                <Button variant="secondary">More</Button>
                <UpdateDialog id={classroom.id} />
                <ButtonWithAlert />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassroomsCard;
