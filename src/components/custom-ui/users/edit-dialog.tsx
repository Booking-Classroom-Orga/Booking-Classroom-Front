import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { update, findById } from "@/services/user.service";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const UpdateDialog = ({
  id,
  onUpdate,
}: {
  id: number;
  onUpdate: () => void;
}) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const user = await findById(Number(id));

        form.reset({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }
    };

    if (open) {
      fetchData();
    }
  }, [id, open]);

  const onSubmit = async (data: any) => {
    await update(Number(id), data);
    setOpen(false);
    onUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user's informations below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="FirstName" className="text-right">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="eg. John"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="lastName" className="text-right">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="capacity"
                        placeholder="eg. Doe"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="email" className="text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="equipment"
                        placeholder="eg. johndoe@mail.com"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
