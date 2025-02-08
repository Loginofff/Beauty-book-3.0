"use client";

import React, { useEffect, useState } from "react";
import MasterDetails from "../../../(route)/details/_components/MasterDetails";

function Details({ params }) {
  const [master, setMaster] = useState();

  useEffect(() => {
    const getMasterById = async () => {
      try {
        const res = await fetch(
          `https://beautybook-production-c53c.up.railway.app/api/users/${params.recordId}`,
          {
            headers: { accept: "*/*" },
          }
        );
        const data = await res.json();
        console.log(data);
        setMaster(data);
      } catch (error) {
        console.error("Error fetching master:", error);
      }
    };

    getMasterById();
  }, [params.recordId]); // Add params.recordId as dependency

  return (
    <div className="p-5">
      <h2 className="font-bold text-[22px]">Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Master details */}
        <div className="col-span-3">
          <MasterDetails master={master} />
        </div>
      </div>
    </div>
  );
}

export default Details;