import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const UserNotConnected = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="font-bold">Guess You're Not Connected!</CardTitle>
          <CardDescription>
            You need to be connected to access our services! Please login to your account or create
            one!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end gap-4">
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button variant={'outline'} onClick={() => navigate('/signup')}>
            Signup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserNotConnected;
