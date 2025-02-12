import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { update, findById } from "@/services/classroom.service";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateDialog = () => {
  const { id } = useParams();
  const form = useForm();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const classroom = await findById(Number(id));
        form.reset({
          name: classroom.name,
          capacity: classroom.capacity,
          equipement: classroom.equipement.join(", "),
        });
      }
    };

    if (open) {
      fetchData();
    }
  }, [id, open, form]);

  const onSubmit = async (data: any) => {
    const parsedData = {
      ...data,
      equipement: data.equipement
        ? data.equipement.split(",").map((item: string) => item.trim())
        : [],
    };

    await update(Number(id), parsedData);
    setOpen(false);
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
          <DialogTitle>Edit Classroom</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
