/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MasterRating from "../../details/_components/Rating";

function Search({ params }) {
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const mastersPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://beautybook-production-c53c.up.railway.app/api/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (params.cname && categories.length > 0) {
      const decodedCategoryName = decodeURIComponent(params.cname);
      const category = categories.find(
        (cat) => cat.name.toLowerCase() === decodedCategoryName.toLowerCase()
      );

      if (category) {
        getMasters(category.id);
      } else {
        setError("Category not found.");
      }
    }
  }, [params.cname, categories]);

  const getMasters = async (categoryId) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://beautybook-production-c53c.up.railway.app/api/users/by-category/${categoryId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from server.");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setMasters(data);
      } else {
        setMasters([]);
        setError("No masters found in this category.");
      }
    } catch (error) {
      setError("Failed to fetch masters.");
    }
    setLoading(false);
  };

  const MasterCard = ({ master }) => {
    const categoryNames = master.categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : null;
    });

    return (
      <Link href={`/details/${master.id}`}>
        <div
          className="border-[1px] rounded-lg p-3 cursor-pointer
          hover:border-green-700 hover:shadow-sm transition-all 
          ease-in-out mt-5 flex flex-col sm:flex-row items-center"
        >
          <img
            src={master.profileImageUrl}
            alt="searchPhoto"
            className="w-[100px] h-[100px] rounded-full object-cover sm:mr-5"
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm bg-green-900 text-white p-2 rounded-full mt-1 inline-block">
              {categoryNames.join(", ")}
            </p>
            <h2 className="font-bold mt-2">
              {master.firstName} {master.lastName}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Address: {master.address}</p>
            <MasterRating master={master} />
          </div>
          <button
            className="p-2 px-3 border-[1px] border-green-700
            text-green-700 rounded-full text-center cursor-pointer
            hover:bg-green-700 hover:text-white mt-2 sm:mt-0"
          >
            Booking Jetzt
          </button>
        </div>
      </Link>
    );
  };

  // Пагинация: Разбиваем мастеров на страницы
  const indexOfLastMaster = currentPage * mastersPerPage;
  const indexOfFirstMaster = indexOfLastMaster - mastersPerPage;
  const currentMasters = masters.slice(indexOfFirstMaster, indexOfLastMaster);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-5 flex-grow">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : currentMasters.length > 0 ? (
          currentMasters.map((master) => <MasterCard key={master.id} master={master} />)
        ) : (
          <p>No masters found in this category.</p>
        )}

        {/* Пагинация */}
        {masters.length > mastersPerPage && (
          <div className="flex justify-center mt-5">
            <button
              className={`px-4 py-2 border rounded-lg mx-1 ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-700 text-white"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>

            <span className="px-4 py-2 border rounded-lg bg-white">
              {currentPage} / {Math.ceil(masters.length / mastersPerPage)}
            </span>

            <button
              className={`px-4 py-2 border rounded-lg mx-1 ${
                currentPage === Math.ceil(masters.length / mastersPerPage)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-700 text-white"
              }`}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(masters.length / mastersPerPage))
                )
              }
              disabled={currentPage === Math.ceil(masters.length / mastersPerPage)}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Футер */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <p>© 2025 BeautyBook. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}

export default Search;
