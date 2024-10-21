import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const ClientProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : "");
  const [newLastName, setNewLastName] = useState(user ? user.lastName : "");
  const [newEmail, setNewEmail] = useState(user ? user.email : "");
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user && user.userId) {
      setUserId(user.userId);
    }
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("lastName", newLastName);
      formData.append("email", newEmail);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER +
        //   `/api/metadata/${user.user_id}/profile`,
          `http://localhost:8080/api/metadata/${user.user_id}/profile`,
        {
          method: "PUT",
          body: formData,
        }
      );
      console.log(formData);
      if (!response.ok) {
        throw new Error("Failed to save profile changes");
      }

      console.log("Профиль успешно обновлен");
      toast("Профиль успешно обновлен");
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error.message);
      toast("Ошибка при сохранении профиля");
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="bg-blur-sm p-5 m-2 rounded-lg "
        style={{ width: "1100px" }}
      >
        <h2 className="text-green-900 text-2xl font-semibold mb-5">
          Dein Profil
        </h2>

        <>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">Name:</span> {user && user.name}
          </p>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">Nachname:</span>{" "}
            {user && user.lastName}
          </p>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">E-Mail:</span>{" "}
            {user && user.email}
          </p>
        </>
      </div>
    </div>
  );
};

export default ClientProfile;

