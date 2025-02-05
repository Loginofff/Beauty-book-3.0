import React from "react";
import Image from "next/image";

const ProfileImage = ({ profileImage }) => (
  <div className="flex items-center justify-center">
    {profileImage ? (
      <div className="relative w-48 h-48">
        <Image
          src={profileImage}
          alt="profilePhoto"
          width={192}
          height={192}
          className="rounded-full object-cover shadow-md"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
    ) : (
      <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
        Kein Foto
      </div>
    )}
  </div>
);

export default ProfileImage;
