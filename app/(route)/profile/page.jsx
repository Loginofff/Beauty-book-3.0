"use client";

import React, { useEffect } from "react";
import ClientProfile from "../profile/_components/ClientProfile";
import MasterProfile from "./_components/master/MasterProfile";
import AdminProfile from "../profile/_components/AdminProfile";
import { UserProvider, useUser } from "./_components/UserContext";

const ProfilePage = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    if (!currentUser || !currentUser.accessToken) {
      console.error("Access token is missing or invalid.");
      return;
    }

    const tokenPayload = currentUser.accessToken.split(".")[1];
    try {
      const decodedToken = JSON.parse(atob(tokenPayload));
      setUser({
        email: decodedToken.sub,
        name: decodedToken.firstName,
        lastName: decodedToken.lastName,
        user_id: decodedToken.user_id,
        roles: decodedToken.roles,
        accessToken: currentUser.accessToken,
        refreshToken: currentUser.refreshToken,
      });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [setUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.roles === "ROLE_CLIENT" && <ClientProfile />}
      {user.roles === "ROLE_MASTER" && <MasterProfile />}
      {user.roles === "ROLE_ADMIN" && <AdminProfile />}
    </div>
  );
};

const WrappedProfilePage = () => (
  <UserProvider>
    <ProfilePage />
  </UserProvider>
);

export default WrappedProfilePage;
