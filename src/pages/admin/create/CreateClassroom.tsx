import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const CreateClassroom = () => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="font-bold">Welcome!</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div>
                  <FormItem className="flex m-0 items-center justify-between space-x-4">
                    <div className="">
                      <FormLabel>First Name</FormLabel>
                      <FormControl className="mt-2">
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                    </div>
                    <div className="!mt-0">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl className="mt-2">
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
            <div className="text-center text-sm text-gray-500">
              You already have an account?&nbsp;
              <Link to="/" className="text-blue-500">
                Login
              </Link>
            </div>
            <div className=" w-full flex justify-end">
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateClassroom;
