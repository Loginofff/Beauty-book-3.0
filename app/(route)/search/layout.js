import React from "react";
import CategoryList from "./_components/CategoryList";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Левая колонка для категорий */}
      <div className="hidden md:block md:col-span-3 border-r border-gray-200">
        <CategoryList />
      </div>

      {/* Правая колонка для карточек мастеров */}
      <div className="col-span-12 md:col-span-9 w-full p-5">{children}</div>
    </div>
  );
}

export default Layout;
