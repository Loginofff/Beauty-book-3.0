"use client";

import React, { useEffect, useState } from "react";
import ClientProfile from "../profile/_components/ClientProfile";
import MasterProfile from "../profile/_components/MasterProfile";
import AdminProfile from "../profile/_components/AdminProfile";

const ProfilePage = () => {
  const [userRoles, setUserRoles] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userDescription, setUserDescription] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCategoryIds, setUserCategoryIds] = useState([]);
  const [userProcedureIds, setUserProcedureIds] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    if (!currentUser || !currentUser.accessToken) {
      console.error("Access token is missing:", currentUser);
      return;
    }

    const tokenPayload = currentUser.accessToken.split(".")[1];
    const decodedToken = JSON.parse(atob(tokenPayload));
    console.log("Decoded token:", decodedToken);

    if (!decodedToken || !decodedToken.roles) {
      console.error("User roles are missing in decoded token:", decodedToken);
      return;
    }
    setUserName(decodedToken.firstName);
    setUserLastName(decodedToken.lastName);
    setUserRoles(decodedToken.roles);
    setUserEmail(decodedToken.sub);
    setUserId(decodedToken.user_id);

    if (decodedToken.roles === "MASTER") {
      getMasterById(decodedToken.user_id);
    }
  }, []);

  const getMasterById = async (userId) => {
    try {
      const res = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER + `/api/users/${userId}`,
        `http://localhost:8080/api/users/${userId}`,
        {
          headers: { accept: "*/*" },
        }
      );
      const data = await res.json();
      setUserDescription(data.description || "");
      setUserPhoneNumber(data.phoneNumber || "");
      setUserAddress(data.address || "");
      setUserCategoryIds(data.categoryIds || []);
      setUserProcedureIds(data.procedureIds || []);
    } catch (error) {
      console.error("Error fetching master:", error);
    }
  };

  if (!userRoles) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userRoles === "CLIENT" && (
        <ClientProfile
          user={{
            email: userEmail,
            name: userName,
            lastName: userLastName,
            user_id: userId,
          }}
        />
      )}
      {userRoles === "MASTER" && (
        <MasterProfile
          user={{
            email: userEmail,
            name: userName,
            lastName: userLastName,
            user_id: userId,
            description: userDescription,
            phoneNumber: userPhoneNumber,
            address: userAddress,
            categoryIds: userCategoryIds,
            procedureIds: userProcedureIds,
          }}
        />
      )}
      {userRoles === "ADMIN" && (
        <AdminProfile
          user={{
            email: userEmail,
            name: userName,
            lastName: userLastName,
            user_id: userId,
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;

