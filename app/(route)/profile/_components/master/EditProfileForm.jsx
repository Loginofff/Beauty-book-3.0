import React from "react";
import SelectField from "./SelectField";

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
    <SelectField
      label="Wähle deinen Beruf aus"
      options={categories}
      selectedIds={categoryIds}
      setSelectedIds={setCategoryIds}
    />
    <SelectField
      label="Wähle Behandlungen, die du anbietest"
      options={procedures}
      selectedIds={procedureIds}
      setSelectedIds={setProcedureIds}
    />
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

export default EditProfileForm;
