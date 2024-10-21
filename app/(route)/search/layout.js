import React from "react";
import CategoryList from "./_components/CategoryList";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-4">
      <div className="hidden md:block md:w-1/4 md:h-screen">
        <CategoryList />
      </div>
      <div className="col-span-2 w-full  ">{children}</div>
    </div>
  );
}

export default Layout;



