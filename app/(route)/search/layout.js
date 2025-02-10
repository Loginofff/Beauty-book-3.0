import React from "react";
import CategoryList from "./_components/CategoryList";

function Layout({ children }) {
  return (
    // Используем min-h-screen, чтобы контейнер мог расширяться при большом контенте
    <div className="grid grid-cols-12 min-h-screen">
      {/* Левая колонка для категорий */}
      <div className="hidden md:block md:col-span-3 border-r border-gray-200">
        <CategoryList />
      </div>

      {/* Правая колонка для карточек мастеров и прочего контента */}
      <div className="col-span-12 md:col-span-9 w-full p-5 flex flex-col">
        {/* Основной контент, который растягивается */}
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
