import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Select from "react-select";

const MasterProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [procedureIds, setProcedureIds] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState(null);

  const handleAddPhoto = async () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL.");
      return;
    }

    const data = {
      profileImageUrl: imageUrl,
    };

    try {
      const response = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER +
        //   `/api/metadata/${user.user_id}/profileImages`,
          `http://localhost:8080/api/metadata/${user.user_id}/profileImages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log(data);
        toast.success(
          "Photo added successfully. It will be displayed in the profile."
        );
        setProfileImage(imageUrl);
        setImageUrl("");
      } else {
        toast.error("An error occurred while adding photo.");
        console.log(data);
      }
    } catch (error) {
      console.log(data);
      console.error("Error adding photo:", error);
      toast.error("An error occurred while adding photo.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_PRODUCTION_SERVER +
            `/api/users/${user.user_id}`
        );
        if (response.ok) {
          const userData = await response.json();
          console.log("User data retrieved:", userData);
          setUserData(userData);
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    if (!user || !user.user_id || isNaN(user.user_id)) {
      console.error("Invalid user_id");
      return;
    }

    const userDetails = {
      description,
      phoneNumber,
      address,
      categoryIds: categoryIds.map((id) => parseInt(id)),
      procedureIds: procedureIds.map((id) => parseInt(id)),
    };

    console.log("Data being sent to the server:", userDetails);

    try {
      const response = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER +
        //   `/api/users/${user.user_id}/details`,
          `http://localhost:8080/api/users/${user.user_id}/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem("user"))?.accessToken
            }`,
          },
          body: JSON.stringify(userDetails),
        }
      );

      if (response.ok) {
        toast("Information successfully saved on the server");
        console.log("Information successfully saved on the server");
      } else {
        toast("Error while saving information on the server");
        console.error("Error while saving information on the server");
      }
    } catch (error) {
      toast("Error while executing request");
      console.error("Error while executing request:", error);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (userData) {
      setDescription(userData.description || "");
      setPhoneNumber(userData.phoneNumber || "");
      setAddress(userData.address || "");
      setCategoryIds(userData.categoryIds || []);
      setProcedureIds(userData.procedureIds || []);
      setProfileImage(userData.profileImageUrl || "");
    }
  }, [userData]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          // process.env.NEXT_PUBLIC_PRODUCTION_SERVER + `/api/categories`
          `http://localhost:8080/api/categories`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Categories data:", data);
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProceduresForSelectedCategories() {
      if (categoryIds.length > 0) {
        const promises = categoryIds.map((categoryId) =>
          fetch(
            // process.env.NEXT_PUBLIC_PRODUCTION_SERVER +
            //   `/api/procedures/by-category/${categoryId}`
              `http://localhost:8080/api/procedures/by-category/${categoryId}`
          ).then((response) => response.json())
        );
        try {
          const results = await Promise.all(promises);
          console.log("Procedures data:", results);
          const procedures = results.flat(); // Flatten the array of arrays into a single array
          setProcedures(procedures);
        } catch (error) {
          console.error("Error fetching procedures:", error);
        }
      } else {
        setProcedures([]);
      }
    }

    fetchProceduresForSelectedCategories();
  }, [categoryIds]);

  const getCategoryNames = (categoryIds) => {
    return categoryIds
      .map((id) => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  };

  const getProcedureNames = (procedureIds) => {
    return procedureIds
      .map((id) => {
        const procedure = procedures.find((procedure) => procedure.id === id);
        return procedure ? procedure.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  };

  return (
    <div className="flex justify-center">
    <div className="bg-blur-sm p-5 m-2 rounded-lg " style={{ width: "1100px" }}>
    <h2 className="text-green-900 text-2xl font-semibold mb-5">
    Master Profil
  </h2>

  {!editing ? (
    <>
      <div className="flex justify-between ">
        <div>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">Name:</span> {userData?.firstName}
          </p>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">Nachname:</span> {userData?.lastName}
          </p>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">E-Mail:</span> {userData?.email}
          </p>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">Telefonnummer:</span> {phoneNumber}
          </p>
          <p className="text-green-900 mb-3">
            <span className="font-bold text-xl">Adresse:</span> {address}
          </p>
        </div>
        <div>
          {profileImage && (
            <img
              src={profileImage}
              alt="profilePhoto"
              style={{
                width: "190px",
                height: "190px",
                borderRadius: "10%",
                objectFit: "cover",
                marginRight: "80px",
              }}
            />
          )}
        </div>
      </div>

      <p className="text-green-900 mb-3">
        <span className="font-bold text-xl">Beruf:</span> {getCategoryNames(categoryIds)}
      </p>
      <p className="text-green-900 mb-3">
        <span className="font-bold text-xl">Behandlungen:</span> {getProcedureNames(procedureIds)}
      </p>

      <p className="text-green-900 mb-2">
        <span className="font-bold text-xl">Beschreibung:</span> {description}
      </p>

          <button
            onClick={handleEditClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Profil bearbeiten
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block border border-gray-300 rounded-md p-2 mb-2 "
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
              options={procedures
                .filter((proc) =>
                  categoryIds.some((catId) => proc.categoryId === catId)
                )
                .map((procedure) => ({
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
            onClick={handleSaveClick}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
          >
            Änderungen speichern
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Abbrechen
          </button>
        </>
      )}
      <div className="mt-5">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Foto hochladen"
          className="block border border-gray-300 rounded-md p-2 mb-2"
          style={{ color: "black", backgroundColor: "white" }}
        />
        <button
          onClick={handleAddPhoto}
          className="bg-green-600 hover:bg-green-800 text-white 
          font-bold py-2 px-4 rounded mr-2"
        >
          Foto hinzufügen
        </button>
      </div>
    </div>
    </div>
  );
};

export default MasterProfile;

