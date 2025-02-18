import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { School } from 'lucide-react';
import ButtonWithAlert from '@/components/custom-ui/classrooms/button-with-alert';
import UpdateDialog from '@/components/custom-ui/classrooms/edit-dialog';
import { useEffect, useState } from 'react';
import { findAll } from '@/services/classroom.service';
import { ClassroomType } from '@/types/classroom.type';
import CreateDialog from '../classrooms/create-dialog';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '@/services/auth.service';
import { findById } from '@/services/user.service';

const ClassroomsCard = () => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchClassrooms = async () => {
    try {
      const data = await findAll();
      setClassrooms(data);
      console.log('Classrooms fetched:', data);
    } catch (error) {
      console.error('Failed to fetch classrooms:', error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userId = getUserId();
        if (userId) {
          const user = await findById(userId);
          setIsAdmin(user.roles.includes('admin'));
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
    fetchClassrooms();
  }, []);

  const goToSingleClassroom = (id: number) => {
    navigate(`/classroom/${id}`);
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold flex items-center">
            <School className="w-5 h-5 mr-2" /> Classrooms
          </CardTitle>
          {isAdmin && <CreateDialog onCreate={fetchClassrooms} />}
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {classrooms.map((classroom) => (
            <AccordionItem key={classroom.id} value={`item-${classroom.id}`}>
              <AccordionTrigger>{classroom.name}</AccordionTrigger>
              <AccordionContent className="flex justify-end space-x-4">
                <Button variant="secondary" onClick={() => goToSingleClassroom(classroom.id)}>
                  More
                </Button>
                {isAdmin && (
                  <>
                    <UpdateDialog id={classroom.id} onUpdate={fetchClassrooms} />
                    <ButtonWithAlert id={classroom.id} onDelete={fetchClassrooms} />
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClassroomsCard;
