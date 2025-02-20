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
import { Form, FormField, FormItem, FormLabel, FormControl } from '../../ui/form';
import { update, findById } from '@/services/equipment.service';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const UpdateDialog = ({ id, onUpdate }: { id: number; onUpdate: () => void }) => {
  const form = useForm({
    defaultValues: {
      name: '',
      quantity: 0,
    },
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const equipmentData = await findById(Number(id));
        console.log('Fetched equipment:', equipmentData); // Debugging

        if (Array.isArray(equipmentData) && equipmentData.length > 0) {
          const equipment = equipmentData[0]; // Extract the first element
          form.reset({
            name: equipment.name,
            quantity: equipment.quantity,
          });
          console.log('Form values after reset:', form.getValues()); // Debugging
        }
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
          <DialogTitle>Edit Equipment</DialogTitle>
          <DialogDescription>
            Update the equipment's information below. Click save when you're done.
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
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
