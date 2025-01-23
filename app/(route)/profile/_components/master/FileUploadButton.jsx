import React from "react";

const FileUploadButton = ({ label, onChange }) => (
  <label className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-green-800 transition">
    {label}
    <input type="file" onChange={onChange} accept="image/*" className="hidden" />
  </label>
);

export default FileUploadButton;