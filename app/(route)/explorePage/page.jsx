"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../_components/map/Map"), {
  ssr: false,
});

const ExplorePage = () => {
  return (
    <div className="m-10 max-w-[800px] mx-auto mb-10 items-center flex flex-col gap-4 px-5">
      <h2 className="font-bold text-4xl tracking-wide">
        Finde deinen <span className="text-green-800">Meister</span>{" "}
      </h2>
      <h2 className="text-black text-xl">
        Suchen Sie Ihren Master und buchen Sie einen Termin mit einem Klick
      </h2>

      <Map />
    </div>
  );
};

export default ExplorePage;

