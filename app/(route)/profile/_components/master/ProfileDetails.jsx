import React from "react";
import Image from "next/image";
import ProfileField from "./ProfileField";
import ProfileImage from "./ProfileImage";

const ProfileDetails = React.memo(function ProfileDetails({
  userData,
  profileImage,
  getCategoryNames,
  getProcedureNames,
  phoneNumber,
  address,
  description,
}) {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md" style={{ backgroundColor: "transparent" }}>
      <div className="flex justify-between gap-5 flex-wrap items-center">
        <div className="flex flex-col gap-3 flex-grow">
          <ProfileField label="Name" value={userData?.firstName} />
          <ProfileField label="Nachname" value={userData?.lastName} />
          <ProfileField label="E-Mail" value={userData?.email} />
          <ProfileField label="Telefonnummer" value={phoneNumber} />
          <ProfileField label="Adresse" value={address} />
        </div>
        <ProfileImage profileImage={profileImage} />
      </div>
      <div className="flex flex-wrap gap-5 mt-5">
        <ProfileField label="Beruf" value={getCategoryNames(userData?.categoryIds || [])} />
        <ProfileField label="Behandlungen" value={getProcedureNames(userData?.procedureIds || [])} />
        <ProfileField label="Beschreibung" value={description} />
      </div>
    </div>
  );
});

export default ProfileDetails;