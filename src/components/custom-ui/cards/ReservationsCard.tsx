import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationType } from "@/types/reservation.type.ts";
import {
    deleteReservation,
    findAllReservations,
} from "@/services/reservation.service.ts";
import UpdateDialog from "@/components/custom-ui/reservations/edit-dialog.tsx";
import CreateReservationDialog from "@/components/custom-ui/reservations/create-dialog";

const ReservationsCard = () => {
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const navigate = useNavigate();

    const fetchReservation = async () => {
        try {
            const data = await findAllReservations();
            setReservations(data);
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
        }
    };

    useEffect(() => {
        fetchReservation();
    }, []);

    const handleDelete = async (reservationId: number, userId: number) => {
        await deleteReservation(reservationId, userId);
        fetchReservation();
    };

    const goToSingleReservation = (id: number) => () => {
        navigate(`/reservation/${id}`);
    };

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-bold flex items-center">
                        <CalendarCheck className="w-5 h-5 mr-2" /> Reservations
                    </CardTitle>
                    <CreateReservationDialog onCreate={fetchReservation} />
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    {reservations.map((reservation) => (
                        <AccordionItem
                            key={reservation.id}
                            value={`item-${reservation.id}`}
                        >
                            <AccordionTrigger>
                                {reservation.classroom.name} by {reservation.user.firstName}{" "}
                                {reservation.user.lastName}
                            </AccordionTrigger>
                            <AccordionContent className="flex justify-end items-center space-x-4">
                                <Button
                                    variant="secondary"
                                    onClick={goToSingleReservation(reservation.id)}
                                >
                                    More
                                </Button>
                                <UpdateDialog
                                    id={reservation.id}
                                    userId={reservation.user.id}
                                    startTime={reservation.startTime}
                                    endTime={reservation.endTime}
                                    onUpdate={fetchReservation}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        handleDelete(reservation.id, reservation.user.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default ReservationsCard;