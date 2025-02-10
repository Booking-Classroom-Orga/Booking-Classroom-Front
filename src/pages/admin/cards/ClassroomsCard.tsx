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

const ClassroomsCard = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold flex items-center">
            <School className="w-5 h-5 mr-2" /> Classrooms
          </CardTitle>
          <Button>New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Class 1</AccordionTrigger>
            <AccordionContent className="flex justify-end space-x-4">
              <Button variant="secondary">More</Button>
              <UpdateDialog />
              <ButtonWithAlert />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Class 2</AccordionTrigger>
            <AccordionContent className="flex justify-end space-x-4">
              <Button variant="secondary">More</Button>
              <UpdateDialog />
              <ButtonWithAlert />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassroomsCard;
