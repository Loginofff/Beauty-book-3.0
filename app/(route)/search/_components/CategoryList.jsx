"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const res = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER + "/api/categories",
        "http://localhost:8080/api/categories",
        {
          headers: { accept: "*/*" },
        }
      );
      const arr = await res.json();
      setCategoryList(arr);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (name) => {
    setSelectedCategory(name === selectedCategory ? null : name);
  };

  const filteredCategories = categoryList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-2 h-screen mt-10 flex flex-col w-[170px]">
      <input
        className="mb-2 px-3 py-2 border rounded-lg w-full "
        type="text"
        placeholder="Category finden..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredCategories.length === 0 ? (
          <div>No results found.</div>
        ) : (
          <div>
            {filteredCategories.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 mb-2 rounded-md"
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
                <Link href={"/search/" + item.name}>
                  <div>{item.name}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryList;

