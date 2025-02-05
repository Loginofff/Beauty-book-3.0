import React from "react";

const ProfileField = ({ label, value }) => (
  <div className="flex items-center gap-2">
    <span className="font-bold text-green-800 text-xl">{label}:</span>
    <div className="bg-green-50 border border-green-200 rounded-md p-2 text-green-900 flex-grow">
      {value || "Nicht angegeben"}
    </div>
  </div>
);

export default ProfileField;
