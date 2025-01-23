import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";

const PortfolioGallery = ({ images, onDelete }) => (
  <div className="shadow-xl p-8  rounded-lg w-full max-w-5xl" style={{ backgroundColor: "transparent" }}>
    <ImageGallery
      items={images.map((img) => ({
        original: img.url,
        thumbnail: img.url,
        renderItem: () => (
          <div className="relative flex justify-center items-center">
            <div className="relative w-full h-auto flex justify-center items-center">
              {img.url ? (
                <Image
                  src={img.url}
                  alt="Portfolio"
                  width={800}
                  height={600}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  style={{ objectFit: "cover", width: "auto", height: "auto" }}
                  priority // Добавляем свойство priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                  Kein Foto
                </div>
              )}
            </div>
            <button
              onClick={() => onDelete(img.id)}
              className="absolute top-2 right-2 bg-gray-500 text-white text-sm p-2 rounded-full shadow-lg"
            >
              Löschen
            </button>
          </div>
        ),
      }))}
      showFullscreenButton={true}
      showPlayButton={false}
      thumbnailPosition="bottom"
    />
  </div>
);

export default PortfolioGallery;