import ButtonWithAlert from '@/components/custom-ui/classrooms/button-with-alert';
import UpdateDialog from '@/components/custom-ui/classrooms/edit-dialog';
import CustomSidebar from '@/components/custom-ui/custom-sidebar';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { findById } from '@/services/classroom.service';
import { ClassroomType } from '@/types/classroom.type';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '@/services/auth.service';
import { findById as findUserById } from '@/services/user.service';

const SingleClassroom = () => {
  const [classroom, setClassroom] = useState<ClassroomType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchClassroom = async () => {
    try {
      const data = await findById(Number(id));
      setClassroom(data);
      console.log('Classroom fetched:', data);
    } catch (error) {
      console.error('Failed to fetch classroom:', error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userId = getUserId();
        if (userId) {
          const user = await findUserById(userId);
          setIsAdmin(user.roles.includes('admin'));
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
    fetchClassroom();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CustomSidebar />
      <div className="flex flex-col p-4 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-4 gap-1">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={goBack} />
            <h1 className="font-bold text-3xl">{classroom?.name}</h1>
          </div>
          <div className="flex gap-4">
            {isAdmin && (
              <>
                <UpdateDialog id={Number(id)} onUpdate={fetchClassroom} />
                <ButtonWithAlert id={Number(id)} onDelete={goBack} />
              </>
            )}
          </div>
        </div>

        <div>
          <Card className="w-fit flex px-4 py-2 mb-4">
            <h2 className="text-sm font-bold text-gray-500">Capacity:&nbsp;</h2>
            <p className="text-sm">
              {classroom?.capacity} {classroom?.capacity === 1 ? 'person' : 'people'}
            </p>
          </Card>
          <div className="rounded-md border mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Equipment</TableHead>
                  <TableHead className="font-bold">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classroom?.equipment && classroom.equipment.length > 0 ? (
                  classroom.equipment.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-gray-300 text-lg text-center font-bold">
                      No Equipment
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Card className="w-fit flex px-4 py-2 mb-4">
            <h2 className="text-sm font-bold text-gray-500">Available:&nbsp;</h2>
            <p className="text-sm">{classroom?.isAvailable ? 'Yes' : 'No'}</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SingleClassroom;
