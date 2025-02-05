"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useUser } from "../UserContext";
import ProfileDetails from "./ProfileDetails";
import EditProfileForm from "./EditProfileForm";
import FileUploadButton from "./FileUploadButton";
import PortfolioGallery from "./PortfolioGallery";

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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`https://beautybook-production.up.railway.app/api/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error("Fehler beim Laden der Kategorien.");
    }
  }, []);

  const fetchProcedures = useCallback(async () => {
    if (categoryIds.length > 0) {
      try {
        const promises = categoryIds.map((categoryId) =>
          fetch(`https://beautybook-production.up.railway.app/api/procedures/by-category/${categoryId}`).then((res) => res.json())
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
  }, [categoryIds]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProcedures();
  }, [fetchProcedures]);

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

  const handleSaveClick = async () => {
    const userDetails = {
      description: description.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      categoryIds: categoryIds.length > 0 ? categoryIds : [0],
      procedureIds: procedureIds.length > 0 ? procedureIds : [0],
    };

    try {
      const response = await fetch(
        `https://beautybook-production.up.railway.app/api/users/${user.user_id}/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(userDetails),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const updatedData = await response.json();
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

  const fetchUserData = useCallback(async () => {
    if (!user || !user.user_id) {
      console.error("User ID not found.");
      toast.error("Benutzerdaten konnten nicht geladen werden.");
      return;
    }

    try {
      const response = await fetch(`https://beautybook-production.up.railway.app/api/users/${user.user_id}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

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
      setPortfolioImages(data.portfolioImageUrls || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Fehler beim Laden der Benutzerdaten.");
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.error("Bitte wählen Sie eine Datei zum Hochladen aus!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `https://beautybook-production.up.railway.app/api/metadata/${user.user_id}/profileImage`,
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
        profileImageUrl: data.profileImageUrl,
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

  const handlePortfolioFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePortfolioUpload(file);
    }
  };

  const handlePortfolioUpload = async (file) => {
    if (!file) {
      toast.error("Bitte wählen Sie eine Datei zum Hochladen aus!");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(
        `https://beautybook-production.up.railway.app/api/metadata/${user.user_id}/portfolioImages`,
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

      setPortfolioImages((prev) => [...prev, newImage]);

      toast.success("Foto erfolgreich zum Portfolio hinzugefügt!");
    } catch (error) {
      console.error("Error uploading portfolio image:", error);
      toast.error("Fehler beim Hochladen des Portfolio-Bildes.");
    }
  };

  const handlePortfolioDelete = async (imageId) => {
    try {
      const response = await fetch(
        `https://beautybook-production.up.railway.app/api/metadata/${user.user_id}/portfolioImage/${imageId}`,
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

      setPortfolioImages((prev) => prev.filter((img) => img.id !== imageId));

      toast.success("Foto erfolgreich aus dem Portfolio entfernt!");
    } catch (error) {
      console.error("Error deleting portfolio image:", error);
      toast.error("Fehler beim Entfernen des Portfolio-Bildes.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="shadow-xl p-8 m-4 rounded-lg w-full max-w-5xl" style={{ backgroundColor: "transparent" }}>
        <h2 className="text-green-600 text-lg font-extrabold sm:text-4xl mb-4">Master Profil</h2>
        {!editing ? (
          <>
            <ProfileDetails
              userData={userData}
              profileImage={profileImage}
              getCategoryNames={getCategoryNames}
              getProcedureNames={getProcedureNames}
              phoneNumber={phoneNumber}
              address={address}
              description={description}
            />
            <div className="mt-5 flex justify-between items-center gap-5">
              <button
                onClick={() => setEditing(true)}
                className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-green-800 transition"
              >
                Profil bearbeiten
              </button>
              <FileUploadButton label="Foto zum Portfolio hinzufügen" onChange={handlePortfolioFileChange} />
              <FileUploadButton label="Profilfoto hochladen" onChange={handleFileChange} />
            </div>
            {portfolioImages.length > 0 && (
              <PortfolioGallery images={portfolioImages} onDelete={handlePortfolioDelete} />
            )}
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
            onSave={handleSaveClick}
            onCancel={() => setEditing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MasterProfile;