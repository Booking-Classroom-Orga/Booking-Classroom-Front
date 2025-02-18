import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck } from "lucide-react";

const ReservationsCard = () => {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold flex items-center">
            <CalendarCheck className="w-5 h-5 mr-2" /> Reservations
          </CardTitle>
          <Button>New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Class 3</AccordionTrigger>
            <AccordionContent className="flex justify-end items-center space-x-4">
              <p className="text-sm text-gray-500 font-semibold">Number : 5</p>
              <Button variant="secondary">More</Button>
              <Button variant="destructive">Cancel Reservation</Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>TV</AccordionTrigger>
            <AccordionContent className="flex justify-end space-x-4">
              <p className="text-sm text-gray-500 font-semibold">Number : 10</p>
              <Button variant="secondary">More</Button>
              <Button>Edit</Button>
              <Button variant="destructive">Delete</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ReservationsCard;
