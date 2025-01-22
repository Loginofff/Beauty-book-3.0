"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Select from "react-select";
import { useUser } from "./UserContext";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Компонент для отображения данных профиля
const ProfileDetails = ({
  userData,
  profileImage,
  getCategoryNames,
  getProcedureNames,
  phoneNumber,
  address,
  description,
}) => (
  <div>
    <div className="flex justify-between">
      <div>
        <p className="text-green-900 mb-3">
          <span className="font-bold text-xl">Name:</span> {userData?.firstName}
        </p>
        <p className="text-green-900 mb-3">
          <span className="font-bold text-xl">Nachname:</span>{" "}
          {userData?.lastName}
        </p>
        <p className="text-green-900 mb-3">
          <span className="font-bold text-xl">E-Mail:</span> {userData?.email}
        </p>
        <p className="text-green-900 mb-3">
          <span className="font-bold text-xl">Telefonnummer:</span>{" "}
          {phoneNumber}
        </p>
        <p className="text-green-900 mb-3">
          <span className="font-bold text-xl">Adresse:</span> {address}
        </p>
      </div>
      <div>
        {profileImage ? (
          <img
            src={profileImage}
            alt="profilePhoto"
            className="w-48 h-48 rounded-full object-cover"
          />
        ) : (
          <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl">
            Kein Foto
          </div>
        )}
      </div>
    </div>

    <p className="text-green-900 mb-3">
      <span className="font-bold text-xl">Beruf:</span>{" "}
      {getCategoryNames(userData?.categoryIds || [])}
    </p>
    <p className="text-green-900 mb-3">
      <span className="font-bold text-xl">Behandlungen:</span>{" "}
      {getProcedureNames(userData?.procedureIds || [])}
    </p>
    <p className="text-green-900 mb-2">
      <span className="font-bold text-xl">Beschreibung:</span> {description}
    </p>
  </div>
);

// Компонент для редактирования профиля
const EditProfileForm = ({
  description,
  phoneNumber,
  address,
  categoryIds,
  procedureIds,
  categories,
  procedures,
  setDescription,
  setPhoneNumber,
  setAddress,
  setCategoryIds,
  setProcedureIds,
  onSave,
  onCancel,
}) => (
  <div>
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="block border border-gray-300 rounded-md p-2 mb-2"
      placeholder="Beschreibung"
    />
    <input
      type="text"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      className="block border border-gray-300 rounded-md p-2 mb-2"
      placeholder="Telefonnummer"
    />
    <input
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="block border border-gray-300 rounded-md p-2 mb-2"
      placeholder="Adresse"
    />

    <div style={{ width: "30%" }}>
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Wähle deinen Beruf aus
      </label>
      <Select
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        value={categoryIds.map((id) => ({
          value: id,
          label: categories.find((cat) => cat.id === id)?.name || "",
        }))}
        onChange={(selectedOptions) =>
          setCategoryIds(selectedOptions.map((option) => option.value))
        }
        isMulti
      />
    </div>

    <div style={{ width: "30%" }}>
      <label className="block text-sm font-medium text-gray-700 mt-2">
        Wähle Behandlungen, die du anbietest
      </label>
      <Select
        options={procedures.map((procedure) => ({
          value: procedure.id,
          label: procedure.name,
        }))}
        value={procedureIds.map((id) => ({
          value: id,
          label: procedures.find((proc) => proc.id === id)?.name || "",
        }))}
        onChange={(selectedOptions) =>
          setProcedureIds(selectedOptions.map((option) => option.value))
        }
        isMulti
      />
    </div>

    <button
      onClick={onSave}
      className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
    >
      Änderungen speichern
    </button>
    <button
      onClick={onCancel}
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Abbrechen
    </button>
  </div>
);

const MasterProfile = () => {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [procedureIds, setProcedureIds] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Загрузка фотографий в портфолио
  const handlePortfolioUpload = async (file) => {
    if (!file) {
      toast.error("Bitte wählen Sie eine Datei zum Hochladen aus!");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/metadata/${user.user_id}/portfolioImages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload portfolio image");
      }

      const newImage = await response.json();
      console.log("Server response:", newImage);

      // Обновляем портфолио в состоянии
      setUserData((prev) => ({
        ...prev,
        portfolioImageUrls: [...(prev.portfolioImageUrls || []), newImage],
      }));

      toast.success("Foto erfolgreich zum Portfolio hinzugefügt!");
    } catch (error) {
      console.error("Error uploading portfolio image:", error);
      toast.error("Fehler beim Hochladen des Portfolio-Bildes.");
    }
  };


   // Удаление фотографии из портфолио
   const handlePortfolioDelete = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/metadata/${user.user_id}/portfolioImage/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete portfolio image");
      }

      // Удаляем изображение из состояния
      setUserData((prev) => ({
        ...prev,
        portfolioImageUrls: prev.portfolioImageUrls.filter(
          (img) => img.id !== imageId
        ),
      }));

      toast.success("Foto erfolgreich aus dem Portfolio entfernt!");
    } catch (error) {
      console.error("Error deleting portfolio image:", error);
      toast.error("Fehler beim Entfernen des Portfolio-Bildes.");
    }
  };

  // Обработчик изменения файла
  const handlePortfolioFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePortfolioUpload(file);
    }
  };


  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Fehler beim Laden der Kategorien.");
      }
    };

    fetchCategories();
  }, []);

  // Fetch procedures for selected categories
  useEffect(() => {
    const fetchProcedures = async () => {
      if (categoryIds.length > 0) {
        try {
          const promises = categoryIds.map((categoryId) =>
            fetch(
              `http://localhost:8080/api/procedures/by-category/${categoryId}`
            ).then((res) => res.json())
          );

          const results = await Promise.all(promises);
          setProcedures(results.flat());
        } catch (error) {
          console.error("Error fetching procedures:", error);
          toast.error("Fehler beim Laden der Behandlungen.");
        }
      } else {
        setProcedures([]);
      }
    };

    fetchProcedures();
  }, [categoryIds]);

  // Helper functions to get names of categories and procedures
  const getCategoryNames = (ids) => {
    return ids
      .map((id) => categories.find((cat) => cat.id === id)?.name || "")
      .filter((name) => name)
      .join(", ");
  };

  const getProcedureNames = (ids) => {
    return ids
      .map((id) => procedures.find((proc) => proc.id === id)?.name || "")
      .filter((name) => name)
      .join(", ");
  };

  // Save profile data
  const handleSaveClick = async () => {
    // Формируем объект данных
    const userDetails = {
      description: description.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      categoryIds: categoryIds.length > 0 ? categoryIds : [0], // Если пусто, отправляем [0]
      procedureIds: procedureIds.length > 0 ? procedureIds : [0], // Если пусто, отправляем [0]
    };

    try {
      // Отправляем PUT-запрос
      const response = await fetch(
        `http://localhost:8080/api/users/${user.user_id}/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json", // Добавляем accept-заголовок
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(userDetails), // Преобразуем объект в JSON
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }
      console.log(userDetails);
      const updatedData = await response.json();

      // Обновляем состояние
      setUserData(updatedData);
      setDescription(updatedData.description || "");
      setPhoneNumber(updatedData.phoneNumber || "");
      setAddress(updatedData.address || "");
      setCategoryIds(updatedData.categoryIds || []);
      setProcedureIds(updatedData.procedureIds || []);
      toast.success("Profil erfolgreich aktualisiert.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Fehler beim Aktualisieren des Profils.");
    } finally {
      setEditing(false);
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.user_id) {
        console.error("User ID not found.");
        toast.error("Benutzerdaten konnten nicht geladen werden.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${user.user_id}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setProfileImage(data.profileImageUrl || "");
        setDescription(data.description || "");
        setPhoneNumber(data.phoneNumber || "");
        setAddress(data.address || "");
        setCategoryIds(data.categoryIds || []);
        setProcedureIds(data.procedureIds || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
      }
    };

    fetchUserData();
  }, [user]);

  // Upload profile image
  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("Bitte wählen Sie eine Datei zum Hochladen aus!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
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
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setProfileImage(data.profileImageUrl);
      setUserData((prev) => ({
        ...prev,
        profileImageUrl: data.profileImageUrl, // Обновляем userData
      }));
      toast.success("Foto erfolgreich hochgeladen!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Fehler beim Hochladen des Fotos.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg p-5 m-2 rounded-lg w-full max-w-4xl">
        <h2 className="text-green-900 text-2xl font-semibold mb-5">
          Master Profil
        </h2>
  
        {!editing ? (
          <>
            <ProfileDetails
              userData={userData}
              profileImage={profileImage}
              getCategoryNames={(ids) =>
                ids
                  .map(
                    (id) => categories.find((cat) => cat.id === id)?.name || ""
                  )
                  .join(", ")
              }
              getProcedureNames={(ids) =>
                ids
                  .map(
                    (id) =>
                      procedures.find((proc) => proc.id === id)?.name || ""
                  )
                  .join(", ")
              }
              phoneNumber={phoneNumber}
              address={address}
              description={description}
            />
  
            {/* Кнопка редактирования профиля */}
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition mt-5"
            >
              Profil bearbeiten
            </button>
  
            {/* Контейнер для кнопок */}
            <div className="mt-5 flex justify-between items-center">
              {/* Кнопка загрузки фото в портфолио */}
              <label className="bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-green-700 transition text-center">
                Foto zum Portfolio hinzufügen
                <input
                  type="file"
                  onChange={handlePortfolioFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
  
              {/* Кнопка загрузки фото профиля */}
              <label className="bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition text-center">
                Foto auswählen und hochladen
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
  
            {/* Отображение альбома портфолио с возможностью удаления */}
            <div className="mt-5">
              {userData?.portfolioImageUrls?.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h2 className="text-center text-lg font-bold my-4">Portfolio</h2>
                  <ImageGallery
                    items={userData.portfolioImageUrls.map((img) => ({
                      original: img.url,
                      thumbnail: img.url,
                      renderItem: () => (
                        <div className="relative">
                          <img
                            src={img.url}
                            alt="Portfolio"
                            className="w-full h-auto rounded-lg"
                          />
                          <button
                            onClick={() => handlePortfolioDelete(img.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white text-sm p-2 rounded-full shadow-lg"
                          >
                            Löschen
                          </button>
                        </div>
                      ),
                    }))}
                    showFullscreenButton={true} // Кнопка для полного экрана
                    showPlayButton={false} // Убираем кнопку автопроигрывания
                    thumbnailPosition="bottom" // Миниатюры снизу
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <EditProfileForm
            description={description}
            phoneNumber={phoneNumber}
            address={address}
            categoryIds={categoryIds}
            procedureIds={procedureIds}
            categories={categories}
            procedures={procedures}
            setDescription={setDescription}
            setPhoneNumber={setPhoneNumber}
            setAddress={setAddress}
            setCategoryIds={setCategoryIds}
            setProcedureIds={setProcedureIds}
            onSave={handleSaveClick} // Вызвать handleSaveClick
            onCancel={() => setEditing(false)}
          />
        )}
      </div>
    </div>
  );
  
};

export default MasterProfile;
