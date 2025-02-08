"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const res = await fetch(
          "https://beautybook-production-c53c.up.railway.app/api/categories",
          {
            headers: { accept: "*/*" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories.");
        }

        const arr = await res.json();

        setCategoryList(arr);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategoryList();
  }, []);

  const handleCategoryClick = (name) => {
    setSelectedCategory(name === selectedCategory ? null : name);
  };

  const filteredCategories = categoryList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-2 mt-5 flex flex-col md:h-screen md:w-[170px]">
      {/* Поле поиска */}
      <input
        className="mb-2 px-3 py-2 border rounded-lg w-full"
        type="text"
        placeholder="Категория suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex md:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-hidden">
        {filteredCategories.length === 0 ? (
          <div>No results found.</div>
        ) : (
          filteredCategories.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 mb-2 rounded-md whitespace-nowrap md:whitespace-normal"
              onClick={() => handleCategoryClick(item.name)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                textDecoration: "none",
                color: selectedCategory === item.name ? "white" : "green",
                backgroundColor:
                  selectedCategory === item.name ? "green" : "transparent",
              }}
            >
              <Link href={`/search/${encodeURIComponent(item.name)}`}>
                <div>{item.name}</div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryList;
