import {ReservationDto} from "../types/reservation.type";

export const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
    return localStorage.getItem("token");
};

export const findAllReservations = async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/reservations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const findReservationById = async (id: number) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/reservations/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const createReservation = async (reservation: ReservationDto & { userId: number }) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservation),
    });
    return await response.json();
};

export const updateReservation = async (id: number, userId: number, reservation: ReservationDto) => {
    const token = getToken();
    const data = {
        ...reservation,
        userId,
    }

    const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const deleteReservation = async (id: number, userId: number) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId}),
    });

    if (!response.ok) {
        throw new Error("Failed to delete reservation");
    }

    return await response.json();
};
