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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { createReservation } from "@/services/reservation.service";
import { useState } from "react";
import { ReservationDto } from "@/types/reservation.type.ts";
import { getUserId } from "@/services/auth.service";

const CreateReservationDialog = ({ onCreate }: { onCreate: () => void }) => {
    const form = useForm();
    const [open, setOpen] = useState(false);

    const onSubmit = async (reservation: ReservationDto) => {
        const userId = getUserId();
        const reservationWithUser = { ...reservation, userId };
        await createReservation(reservationWithUser);
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
                    <DialogTitle>New Reservation</DialogTitle>
                    <DialogDescription>
                        Create a new reservation here. Click create when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="classroom"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel htmlFor="classroom" className="text-right">
                                            Classroom
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="classroom"
                                                placeholder="Classroom ID"
                                                className="col-span-3"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel htmlFor="startTime" className="text-right">
                                            Start Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="startTime"
                                                type="datetime-local"
                                                className="col-span-3"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel htmlFor="endTime" className="text-right">
                                            End Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="endTime"
                                                type="datetime-local"
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

export default CreateReservationDialog;