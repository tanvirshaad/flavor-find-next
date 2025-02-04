"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getUserFromCookie } from "@/utility/token";
import React from "react";

const ReservationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkAuth = () => {
      const userId = getUserFromCookie();
      console.log("UserId from token:", userId);
      if (!userId) {
        setError("Please login first");
        router.push("/Auth/Login");
      }
    };
    checkAuth();
  }, [router]);

  const onSubmit = async (data: any) => {
  const userId = getUserFromCookie();
  console.log("Form Data:", data);
  if (!userId) {
    setError("User ID missing. Please login again.");
    return;
  }
  if (!unwrappedParams?.id) {
    setError("Restaurant ID is missing.");
    return;
  }

  try {
    setLoading(true);

  
    const [year, month, day] = data.reservationDate.split("-").map(Number);
    const [hours, minutes] = data.reservationTime.split(":").map(Number);


    const reservationDateTime = new Date(year, month - 1, day, hours, minutes);

  
    if (isNaN(reservationDateTime.getTime())) {
      setError("Invalid date or time format");
      return;
    }

 
    const isoReservationDate = reservationDateTime.toISOString();

  
    const requestData = {
      reservationDate: isoReservationDate, 
      reservationTime: data.reservationTime, 
      partySize: Number(data.partySize),
      userId,
      restaurantId: Number(unwrappedParams.id),
      status: "Pending",
    };

    console.log("Sending request with data:", requestData);

    const response = await axios.post(
      "http://localhost:4000/reservations/",
      requestData,
      { withCredentials: true }
    );

    console.log("Response:", response);
    alert("Reservation Created Successfully!");
    reset();
  } catch (err: any) {
    console.error("Error Response:", err.response);
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Create Reservation
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="date"
          placeholder="Reservation Date"
          min={new Date().toISOString().split("T")[0]}
          {...register("reservationDate", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="time"
          placeholder="Reservation Time"
          min="09:00"
          max="22:00"
          step="1800"
          {...register("reservationTime", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="No. of Guests"
          min="1"
          max="20"
          {...register("partySize", { required: true })}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn bg-black btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Reservation"}
        </button>
      </form>
    </div>
  );
};

export default ReservationPage;