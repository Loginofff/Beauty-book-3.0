"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const res = await fetch("https://beautybook-production.up.railway.app/api/categories", {
        headers: { accept: "*/*" },
      });
      const arr = await res.json();
      setCategoryList(arr);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="mb-10 items-center flex flex-col gap-4 px-5">
      <h2 className="font-bold text-4xl tracking-wide">
        Wähle eine <span className="text-green-800">Kategorie</span>{" "}
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categoryList.slice(0, 6).map((item) => {
          const imagePath = `/${item.name}.png`;

          return (
            <Link href={`/search/${item.name}`} key={item.id}>
              <div className="flex flex-col text-center items-center p-5 hover:scale-110 transition-all ease-in-out cursor-pointer">
                <Image
                  src={imagePath}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <label>{item.name}</label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySearch;

