import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { authentification } from '@/services/auth.service';

const Login = () => {
    const form = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            await authentification(data);
            navigate('/verify-code', { state: { email: data.email } });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="font-bold">Welcome Back!</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="text-center text-sm text-gray-500">
                                You don't have an account?&nbsp;
                                <Link to="/signup" className="text-blue-500">
                                    Signup
                                </Link>
                            </div>
                            <Button type="submit" className=" w-full">
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;