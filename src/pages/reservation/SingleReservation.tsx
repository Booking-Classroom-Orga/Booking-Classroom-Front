import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ReservationType} from "@/types/reservation.type.ts";
import {findAllReservations, findReservationById} from "@/services/reservation.service.ts";
import UpdateDialog from "@/components/custom-ui/reservations/edit-dialog.tsx";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

const SingleReservation = () => {
    const {id} = useParams<{ id: string }>();
    const [reservation, setReservation] = useState<ReservationType | null>(null);
    const navigate = useNavigate();

    const fetchReservation = async () => {
        try {
            const data = await findReservationById(Number(id));
            setReservation(data);
        } catch (error) {
            console.error("Failed to fetch reservation:", error);
        }
    };

    useEffect(() => {
        fetchReservation();
    }, [id]);

    if (!reservation) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className="flex flex-col p-4 w-full">
            <Button
                variant="ghost"
                className="w-fit mb-4"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="mr-2 h-4 w-4"/> Back
            </Button>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="font-bold">Reservation Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <p><strong>Classroom:</strong> {reservation.classroom.name}</p>
                        <p><strong>Capacity:</strong> {reservation.classroom.capacity}</p>
                        <p><strong>User:</strong> {reservation.user.firstName} {reservation.user.lastName}</p>
                        <p><strong>Email:</strong> {reservation.user.email}</p>
                        <p><strong>Start Time:</strong> {formatDate(reservation.startTime)}</p>
                        <p><strong>End Time:</strong> {formatDate(reservation.endTime)}</p>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <UpdateDialog
                            id={reservation.id}
                            userId={reservation.user.id}
                            startTime={reservation.startTime}
                            endTime={reservation.endTime}
                            onUpdate={fetchReservation}
                        />
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SingleReservation;