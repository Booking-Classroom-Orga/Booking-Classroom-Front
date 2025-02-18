import ButtonWithAlert from '@/components/custom-ui/equipments/button-with-alert';
import CreateDialog from '@/components/custom-ui/equipments/create-dialog';
import UpdateDialog from '@/components/custom-ui/equipments/edit-dialog';
import CustomSidebar from '@/components/custom-ui/custom-sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { findAll } from '@/services/equipment.service';
import { EquipmentType } from '@/types/equipment.type';
import { useEffect, useState } from 'react';

const ListEquipment = () => {
  const [equipments, setEquipments] = useState<EquipmentType[]>([]);

  const fetchEquipments = async () => {
    try {
      const data = await findAll();
      setEquipments(data);
      console.log('Equipments fetched:', data);
    } catch (error) {
      console.error('Failed to fetch equipments:', error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <>
      <CustomSidebar />
      <div className="flex flex-col p-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Equipment</h1>
          <CreateDialog onCreate={fetchEquipments} />
        </div>
        <Accordion type="single" collapsible>
          {equipments.map((equipment) => (
            <AccordionItem key={equipment.id} value={`item-${equipment.id}`}>
              <AccordionTrigger>{equipment.name}</AccordionTrigger>
              <AccordionContent className="flex space-x-4">
                <UpdateDialog id={equipment.id} onUpdate={fetchEquipments} />
                <ButtonWithAlert id={equipment.id} onDelete={fetchEquipments} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default ListEquipment;
