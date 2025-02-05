"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import BookingList from "../my-booking/_components/BookingList";

function MyBooking() {
  const [upcomingBookingList, setUpcomingBookingList] = useState([]);
  const [expiredBookingList, setExpiredBookingList] = useState([]);

  useEffect(() => {
    getUserBookingList();
  }, []);

  const getUserBookingList = async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user"));

      if (!currentUser || !currentUser.accessToken) {
        console.error("Access token is missing:", currentUser);
        throw new Error("Access token is missing.");
      }

      const tokenPayload = currentUser.accessToken.split(".")[1];
      const decodedToken = JSON.parse(atob(tokenPayload));

      if (!decodedToken || !decodedToken.user_id) {
        console.error("User ID is missing in decoded token:", decodedToken);
        throw new Error("User ID is missing in decoded token.");
      }

      const userId = decodedToken.user_id;

      const res = await fetch(
        `https://beautybook-production.up.railway.app/api/bookings/${userId}?status=CONFIRMED`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
            accept: "*/*",
          },
        }
      );

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error("Failed to fetch confirmed bookings.");
      }

      // Filter bookings for upcoming and expired based on current date
      const currentDate = new Date();
      const upcomingBookings = data.filter(
        (booking) => new Date(booking.dateTime) >= currentDate
      );
      const expiredBookings = data.filter(
        (booking) => new Date(booking.dateTime) < currentDate
      );

      // Fetch procedure information and master information for each booking
      const updatedUpcomingBookings = await Promise.all(
        upcomingBookings.map(async (booking) => {
          const procedureRes = await fetch(
            `https://beautybook-production.up.railway.app/api/procedures/${booking.procedureId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.accessToken}`,
                accept: "*/*",
              },
            }
          );
          const procedureData = await procedureRes.json();

          const masterRes = await fetch(
            `https://beautybook-production.up.railway.app/api/users/${booking.masterId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.accessToken}`,
                accept: "*/*",
              },
            }
          );
          const masterData = await masterRes.json();

          return {
            ...booking,
            procedureInfo: procedureData,
            masterInfo: masterData,
          };
        })
      );

      setUpcomingBookingList(updatedUpcomingBookings);
      setExpiredBookingList(expiredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-xl">My Booking</h2>

      <Tabs defaultValue="upcoming" className="w-full mt-5 ">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {" "}
          <BookingList bookingList={upcomingBookingList} />{" "}
        </TabsContent>
        <TabsContent value="expired">
          {" "}
          <BookingList bookingList={expiredBookingList} />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
