/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaPhone } from "react-icons/fa";
import BookAppointment from "./BookAppointment";
import { MdEmail } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import MasterRating from "../../details/_components/Rating";
import MasterReviews from "../../details/_components/Review";
import Image from "next/image";

function MasterDetails({ master }) {
  const [selectedProcedureId, setSelectedProcedureId] = useState(null);
  const [procedures, setProcedures] = useState([]);
  const [images, setImages] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    async function fetchProcedures() {
      try {
        const promises = master?.procedureIds?.map((id) =>
          fetch(
            `https://beautybook-production.up.railway.app/api/procedures/${id}`
          ).then((res) => res.json())
        );
        const results = await Promise.all(promises || []);
        setProcedures(results);
      } catch (error) {
        console.error("Error fetching procedures:", error);
      }
    }

    if (master?.procedureIds) fetchProcedures();

    if (master?.portfolioImageUrls) {
      const galleryImages = master.portfolioImageUrls.map((img) => ({
        original: img.url,
        thumbnail: img.url,
      }));
      setImages(galleryImages);
    }
  }, [master]);

  const handleProcedureSelection = (procedureId) => {
    setSelectedProcedureId((prev) =>
      prev === procedureId ? null : procedureId
    );
  };

  const categories = [
    { id: 1, name: "FRISEUR" },
    { id: 2, name: "NÄGЕЛ" },
    { id: 3, name: "HAARENTFERNUNG" },
    { id: 4, name: "KOSMETIK" },
    { id: 5, name: "MASSAGE" },
    { id: 6, name: "MAKEUP" },
  ];

  function getCategoryNames(categoryIds) {
    return categoryIds
      .map(
        (id) => categories.find((category) => category.id === id)?.name || null
      )
      .filter(Boolean)
      .join(", ");
  }

  return (
    <>
      {master && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
          {/* Профильное изображение */}
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="w-[300px] md:w-[400px] h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-lg">
              <img
                src={master.profileImageUrl || "/placeholder.png"}
                alt="Profil"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Основная информация */}
          <div className="md:col-span-1 md:col-start-2 mt-5 flex flex-col items-center gap-3">
            {master.categoryIds && (
              <h2 className="text-[15px] bg-green-700 text-white px-3 py-1 rounded-full">
                {getCategoryNames(master.categoryIds)}
              </h2>
            )}
            <h2 className="font-bold text-xl">
              {master.firstName} {master.lastName}
            </h2>
            <p className="text-green-800 text-md flex items-center gap-2">
              <MdEmail className="mr-1" />
              {master.email}
            </p>
            <p className="text-green-800 text-md flex items-center gap-2">
              <MapPin className="mr-1" />
              {master.address}
            </p>
            <p className="text-green-800 text-md flex items-center gap-2">
              <FaPhone className="mr-1" />
              {master.phoneNumber}
            </p>
            <div>{master && <MasterRating master={master} />}</div>
            <p className="font-bold text-black border p-3 rounded-lg mt-2 w-full">
              {master.description}
            </p>
          </div>

          {/* Процедуры */}
          <div className="md:col-span-1 mt-5 md:mt-0 md:col-start-3 flex flex-col">
            <h2 className="font-bold text-center">
              Wählen Sie eine Behandlung aus
            </h2>
            <div className="mt-5 flex flex-col gap-3">
              {procedures.map((procedure) => (
                <button
                  key={procedure.id}
                  className={`px-3 py-2 rounded-lg text-white text-center ${
                    selectedProcedureId === procedure.id
                      ? "bg-blue-500"
                      : "bg-green-700"
                  } hover:bg-green-600`}
                  onClick={() => handleProcedureSelection(procedure.id)}
                >
                  {procedure.name} - {procedure.price} EUR
                </button>
              ))}
            </div>
            {selectedProcedureId && (
              <div className="flex justify-center mt-3">
                <BookAppointment
                  masterId={master.id}
                  selectedProcedureId={selectedProcedureId}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Галерея и отзывы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Галерея */}
        <div className="w-full border rounded-lg">
          {images.length > 0 && (
            <div className="p-4">
              <h2 className="text-center font-bold mb-3">Portfolio</h2>
              <ImageGallery
                items={images}
                showFullscreenButton={true}
                showPlayButton={false}
                thumbnailPosition="bottom"
              />
            </div>
          )}
        </div>

        {/* Отзывы */}
        <div className="w-full border rounded-lg overflow-y-auto max-h-[400px] p-4">
          <h2 className="font-bold mb-3 text-center">Bewertungen</h2>
          <MasterReviews master={master} limit={showAllReviews ? null : 4} />
          <button
            className="text-blue-600 hover:underline mt-3 text-center block"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? "Weniger anzeigen" : "Alle anzeigen"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MasterDetails;
