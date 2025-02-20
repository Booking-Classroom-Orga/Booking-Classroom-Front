import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
} from "../../ui/dialog";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "../../ui/form";
import {updateReservation} from "@/services/reservation.service.ts";
import {useForm} from "react-hook-form";
import {useState} from "react";

interface UpdateDialogProps {
    id: number;
    userId: number;
    startTime: string;
    endTime: string;
    onUpdate: () => void;
}

const UpdateDialog = ({id, userId, startTime, endTime, onUpdate}: UpdateDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const form = useForm({
        defaultValues: {
            startTime: formatDate(startTime),
            endTime: formatDate(endTime),
        },
    });

    const handleSubmit = async (data: { startTime: string; endTime: string }) => {
        try {
            await updateReservation(id, userId, data);
            onUpdate();
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to update reservation:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Update</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Reservation</DialogTitle>
                    <DialogDescription>
                        Update the start and end time of the reservation.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            name="startTime"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="endTime"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>End Time</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateDialog;