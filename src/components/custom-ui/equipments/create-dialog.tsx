import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import { useForm } from 'react-hook-form';
import { create } from '../../../services/equipment.service';
import { useState } from 'react';

const CreateDialog = ({ onCreate }: { onCreate: () => void }) => {
  const form = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    await create(data);
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
          <DialogTitle>New Equipment</DialogTitle>
          <DialogDescription>
            Create a new equipment here. Click create when you're done.
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
                      <Input id="name" placeholder="eg. Table" className="col-span-3" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="quantity" className="text-right">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="quantity"
                        placeholder="eg. 30"
                        className="col-span-3"
                        type="number"
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
