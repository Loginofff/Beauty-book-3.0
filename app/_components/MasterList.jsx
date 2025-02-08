import React, { useEffect, useState } from "react";
import Link from "next/link";
import MasterRating from "../(route)/details/_components/Rating";
import Image from "next/image";

function MasterList() {
  const categories = [
    { id: 1, name: "FRISEUR" },
    { id: 2, name: "NÄGEL" },
    { id: 3, name: "HAARENTFERNUNG" },
    { id: 4, name: "KOSMETIK" },
    { id: 5, name: "MASSAGE" },
    { id: 6, name: "MAKEUP" },
  ];

  const [masterList, setMasterList] = useState([]);
  const [displayedMasters, setDisplayedMasters] = useState([]);

  useEffect(() => {
    const getMasterList = async () => {
      try {
        const res = await fetch("https://beautybook-production-c53c.up.railway.app/api/users/masters", {
          headers: { accept: "*/*" },
        });
        const arr = await res.json();
        const shuffledMasters = shuffleArray(arr);
        setMasterList(shuffledMasters);
        setDisplayedMasters(shuffledMasters.slice(0, 12)); // Отображаем только первые 12 мастеров
      } catch (error) {
        console.error("Error fetching masters:", error);
      }
    };

    getMasterList();
  }, []);

  function getCategoryNames(categoryIds) {
    return categoryIds
      .map((id) => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  }

  // Функция для перемешивания списка
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl ">Beliebte Meister</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
       lg:grid-cols-4 gap-7 mt-4"
      >
        {displayedMasters.map((master, index) => (
          <div
            className="border-[1px] rounded-lg p-3
               cursor-pointer hover:border-green-700 hover:shadow-sm 
               transition-all ease-in-out"
            key={index}
          >
            <Link href={`/details/${master.id}`}>
              {master.profileImageUrl ? (
                <Image
                  src={master.profileImageUrl}
                  alt={`${master.firstName} ${master.lastName}`}
                  width={400}
                  height={400}
                  className="h-[400px] w-full object-cover rounded-lg cursor-pointer"
                />
              ) : (
                <div className="h-[400px] w-full bg-gray-200 rounded-lg cursor-pointer" />
              )}
            </Link>
            <div className="mt-3 items-baseline flex flex-col">
              <h2 className="text-[11px] bg-green-900 p-2 rounded-full px-2 text-white ">
                {getCategoryNames(master.categoryIds)}
              </h2>
              <h2 className="font-bold mb-1">
                {master.firstName} {master.lastName}
              </h2>
              <h2 className="text-black text-md">{master.address}</h2>
              {master && <MasterRating master={master} />}
              <Link className="w-full" href={`/details/${master.id}`}>
                <div className="mobile-button-container">
                  <h2 className="p-2 px-3 border-[1px] border-green-700 text-green-700 rounded-full text-center cursor-pointer hover:bg-green-700 hover:text-white">
                    Booking Jetzt
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasterList;