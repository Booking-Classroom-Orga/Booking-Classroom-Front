import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users } from "lucide-react";

const UsersCard = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold flex items-center">
            <Users className="w-5 h-5 mr-2" /> Users
          </CardTitle>
          <Button>New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>User 1</AccordionTrigger>
            <AccordionContent className="flex justify-end items-center space-x-4">
              <Button variant="secondary">More</Button>
              <Button>Edit</Button>
              <Button variant="destructive">Delete</Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>User 2</AccordionTrigger>
            <AccordionContent className="flex justify-end space-x-4">
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

export default UsersCard;
