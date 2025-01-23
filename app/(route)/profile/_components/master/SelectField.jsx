import React from "react";
import Select from "react-select";

const SelectField = ({ label, options, selectedIds, setSelectedIds }) => (
  <div style={{ width: "30%" }}>
    <label className="block text-sm font-medium text-gray-700 mt-2">{label}</label>
    <Select
      options={options.map((option) => ({
        value: option.id,
        label: option.name,
      }))}
      value={selectedIds.map((id) => ({
        value: id,
        label: options.find((opt) => opt.id === id)?.name || "",
      }))}
      onChange={(selectedOptions) => setSelectedIds(selectedOptions.map((option) => option.value))}
      isMulti
    />
  </div>
);

export default SelectField;