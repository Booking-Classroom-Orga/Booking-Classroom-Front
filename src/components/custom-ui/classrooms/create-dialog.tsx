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
import { Textarea } from "../../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { create } from "../../../services/classroom.service";
import { useState } from "react";

const CreateDialog = ({ onCreate }: { onCreate: () => void }) => {
  const form = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const parsedData = {
      ...data,
      equipement: data.equipement
        ? data.equipement.split(",").map((item: string) => item.trim())
        : [],
    };

    await create(parsedData);
    setOpen(false);
    onCreate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Classroom</DialogTitle>
          <DialogDescription>
            Create a new classroom here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="name" className="text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="eg. Class A"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="capacity" className="text-right">
                      Capacity
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="capacity"
                        placeholder="eg. 30"
                        className="col-span-3"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipement"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="equipement" className="text-right">
                      Equipement(s)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="equipement"
                        placeholder="eg. Projector, Whiteboard"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
