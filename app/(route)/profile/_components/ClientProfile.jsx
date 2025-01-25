"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useUser } from "./UserContext";
import Image from "next/image";

const ClientProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  const fetchUserData = useCallback(async () => {
    if (!user?.accessToken || !user?.user_id) {
      toast.error("Benutzerdaten konnten nicht geladen werden.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.user_id}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (!response.ok) {
        toast.error(`Serverfehler: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Fehler beim Laden der Benutzerdaten:", error);
      toast.error("Benutzerdaten konnten nicht geladen werden.");
    }
  }, [user]);

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("Bitte wählen Sie eine Datei zum Hochladen aus!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://localhost:8080/api/metadata/${user.user_id}/profileImage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Fehler beim Hochladen des Fotos.");
        return;
      }

      const responseData = await response.json();
      setUserData((prev) => ({
        ...prev,
        profileImageUrl: responseData.profileImageUrl,
      }));

      toast.success("Foto erfolgreich hochgeladen!");
    } catch (error) {
      console.error("Fehler beim Hochladen des Fotos:", error);
      toast.error("Fehler beim Hochladen des Fotos.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file); // Автоматически загружаем фото
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-2xl p-10 rounded-lg text-left max-w-4xl w-full">
        <h2 className="text-green-900 text-3xl font-extrabold mb-8 text-left">
          Kundenprofil
        </h2>

        <div className="flex items-center mb-10">
          <div className="w-48 h-48 mr-10">
            {userData?.profileImageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={userData.profileImageUrl}
                  alt="Profilfoto"
                  layout="fill"
                  className="rounded-full object-cover shadow-md"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl">
                Kein Foto
              </div>
            )}
          </div>
          <div className="space-y-4">
            <label className="block bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition text-center">
              Foto auswählen und hochladen
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-green-900 font-bold text-2xl mb-4">Informationen</h3>
          <div className="space-y-4 text-gray-700 text-lg">
            <p>
              <span className="font-bold text-xl text-gray-900">Vorname:</span>{" "}
              {userData?.firstName || "Nicht angegeben"}
            </p>
            <p>
              <span className="font-bold text-xl text-gray-900">Nachname:</span>{" "}
              {userData?.lastName || "Nicht angegeben"}
            </p>
            <p>
              <span className="font-bold text-xl text-gray-900">E-Mail:</span>{" "}
              {userData?.email || "Nicht angegeben"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;