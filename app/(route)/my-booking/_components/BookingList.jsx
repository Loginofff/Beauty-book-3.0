import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { FcCalendar } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcRating } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import Link from "next/link";

function BookingList({ bookingList }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const fetchProcedureInfoForBookings = async () => {
      const updatedBookings = await Promise.all(
        bookingList.map(async (booking) => {
          if (booking.procedureId) {
            try {
              const res = await fetch(
                  `https://beautybook-production.up.railway.app/api/procedures/${booking.procedureId}`,
                {
                  method: "GET",
                  headers: {
                    accept: "*/*",
                  },
                }
              );

              if (!res.ok) {
                throw new Error(
                  `Failed to fetch procedure info for procedure ID ${booking.procedureId}.`
                );
              }

              const procedureInfo = await res.json();
              return { ...booking, procedureInfo };
            } catch (error) {
              console.error(
                `Error fetching procedure info for procedure ID ${booking.procedureId}:`,
                error
              );
              return booking;
            }
          } else {
            return booking;
          }
        })
      );

      setFilteredBookings(updatedBookings);
    };

    fetchProcedureInfoForBookings();
  }, [bookingList]);

  const deleteBooking = async (bookingId) => {
    try {
      const res = await fetch(
        `https://beautybook-production.up.railway.app/api/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))?.accessToken}`,
            accept: "*/*",
          },
        }
      );


      if (!res.ok) {
        throw new Error(`Failed to delete booking with ID ${bookingId}.`);
      }

      console.log(`Booking with ID ${bookingId} deleted successfully.`);

      setFilteredBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error(`Error deleting booking with ID ${bookingId}:`, error);
    }
  };

  return (
    <div>
      {filteredBookings.map((booking, index) => (
        <div
          key={index}
          className="mb-4  flex gap-2 items-center border p-5 rounded-lg justify-between"
        >
          <div className="flex gap-2 items-center">
            <Image
              src="https://www.svgrepo.com/show/530375/calendar.svg"
              alt="Appointment"
              width={70}
              height={70}
              className=" h-[70] w-[70] object-cover mr-5"
            />

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">
                {booking.procedure &&
                  capitalizeFirstLetter(booking.procedure.name)}
              </h2>

              {/* Display master's name and last name */}
              {booking.masterInfo && (
                <div>
                  <Link href={`/details/${booking.masterInfo.id}`}>
                  
                    <p className="text-blue-500 flex gap-2 hover:underline">
                    <FcLowPriority />
                      {booking.masterInfo.firstName}{" "}
                      {booking.masterInfo.lastName}
                    </p>
                  </Link>
                </div>
              )}

              <p className="flex gap-2">
                <FcCalendar />
                {new Date(booking.dateTime).toLocaleDateString(undefined, {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <p className="flex gap-2">
                <FcClock /> At{" "}
                {new Date(booking.dateTime).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>

              {booking.procedureInfo && (
                <div>
                  <p className="flex gap-2">
                    <FcCurrencyExchange /> Price: {booking.procedureInfo.price}{" "}
                    $
                  </p>
                  <p className="flex gap-2" style={{ marginTop: "10px" }}>
                    <FcRating /> {booking.procedureInfo.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {new Date(booking.dateTime) > new Date() && (
            <div className="flex items-center">
              <Button
                className="text-green-600 border-green-600 hover:bg-red-400 hover:text-red-600"
                variant="outline"
                onClick={() => deleteBooking(booking.id)}
              >
                Cancel Appointment
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookingList;
