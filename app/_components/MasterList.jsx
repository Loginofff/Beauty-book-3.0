import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import MasterRating from "../(route)/details/_components/Rating";
import Image from "next/image";

function MasterList() {
  const isFirstLoad = useRef(true);
  const titleRef = useRef(null);
  const categories = [
    { id: 1, name: "FRISEUR" },
    { id: 2, name: "NÄGEL" },
    { id: 3, name: "HAARENTFERNUNG" },
    { id: 4, name: "KOSMETIK" },
    { id: 5, name: "MASSAGE" },
    { id: 6, name: "MAKEUP" },
  ];

  const [displayedMasters, setDisplayedMasters] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [isPaginating, setIsPaginating] = useState(false);

  // Меняем размер страницы на 5 для мобильных устройств
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setSize(5);
      } else {
        setSize(12);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getMasterList = async () => {
      try {
        const res = await fetch(`https://beautybook-production-c53c.up.railway.app/api/users/masters?page=${page}&size=${size}`, {
          headers: { accept: "*/*" },
        });
        const arr = await res.json();
        setDisplayedMasters(arr);
      } catch (error) {
        console.error("Error fetching masters:", error);
      }
    };
    getMasterList();
  }, [page, size]);

  // Скроллим к списку мастеров только если была пагинация
  useEffect(() => {
    if (isPaginating) {
      const gridDiv = document.getElementById('master-list-grid');
      if (gridDiv) {
        gridDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsPaginating(false);
    }
  }, [page, isPaginating]);

  function getCategoryNames(categoryIds) {
    return categoryIds
      .map((id) => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : null;
      })
      .filter((name) => name != null)
      .join(", ");
  }

  // shuffleArray больше не нужен

  return (
    <div>
      <div className="mb-10 px-8">
        <h2 ref={titleRef} className="font-bold text-xl ">Beliebte Meister</h2>
        <div>
          <div id="master-list-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
            {displayedMasters.map((master, index) => (
              <div
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-green-700 hover:shadow-sm transition-all ease-in-out"
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
                  <h2 className="font-bold mb-1 text-[#374151] dark:text-[#e5e7eb]">
                    {master.firstName} {master.lastName}
                  </h2>
                  <h2 className="text-[#374151] dark:text-[#e5e7eb] text-md">{master.address}</h2>
                  {master && <MasterRating master={master} />}
                  <Link className="w-full" href={`/details/${master.id}`}>
                    <div className="mobile-button-container">
                      <h2 className="p-2 px-3 border-[1px] border-[#374151] dark:border-[#e5e7eb] text-[#374151] dark:text-[#e5e7eb] rounded-full text-center cursor-pointer hover:bg-green-700 hover:text-white">
                        Booking Jetzt
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-3 py-2 border rounded-lg mx-1 bg-transparent text-green-700 disabled:text-gray-300 text-2xl transition-colors"
          onClick={() => {
            setIsPaginating(true);
            setPage((p) => Math.max(0, p - 1));
          }}
          disabled={page === 0}
          aria-label="Vorherige Seite"
        >
          &#8592;
        </button>
        <button
          className="px-3 py-2 border rounded-lg mx-1 bg-transparent text-green-700 disabled:text-gray-300 text-2xl transition-colors"
          onClick={() => {
            setIsPaginating(true);
            setPage((p) => p + 1);
          }}
          disabled={displayedMasters.length < size}
          aria-label="Nächste Seite"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default MasterList;