import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyCode } from '@/services/auth.service';

const VerificationCode = () => {
    const form = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const onSubmit = async (data: any) => {
        try {
            await verifyCode(email, data.code);
            navigate('/home');
        } catch (error) {
            console.error('Verification failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="font-bold">Verification Code</CardTitle>
                    <CardDescription>Enter the verification code sent to your email</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <Input type={"number"} placeholder="Enter code" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Verify
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VerificationCode;