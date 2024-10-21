"use client"


// import { Search, MapPin } from "lucide-react";
// import Map from "../../_components/map/Map";



// const ExplorePage = () => {

  
//   return (
//     <div className="m-10 max-w-[800px] mx-auto mb-10 items-center flex flex-col gap-4 px-5">
//       <h2 className="font-bold text-4xl tracking-wide">
//         Finde deinen <span className="text-green-800">Meister</span>{" "}
//       </h2>
//       <h2 className="text-gray-500 text-xl">
//         Suchen Sie Ihren Master und buchen Sie einen Termin mit einem Klick
//       </h2>

//       <div className="m-10 max-w-[800px] mx-auto flex">
//         <div className="flex flex-grow items-center mr-2 bg-[#f0f0f0] rounded-lg overflow-hidden">
//           <Search size={20} className="ml-3 text-gray-400" />
//           <input
//             type="search"
//             placeholder="Service, stylist or salon"
//             className="flex-grow bg-transparent p-2 outline-none text-sm"
//           />
//         </div>

//         <div className="flex flex-grow items-center bg-[#f0f0f0] rounded-lg overflow-hidden">
//           <MapPin size={20} className="ml-3 text-gray-400" />
//           <input
//             type="search"
//             placeholder="Berlin, BE"
//             className="flex-grow bg-transparent p-2 outline-none text-sm"
//           />
//         </div>

//         <button
//           type="submit"
//           className="ml-2 px-5 py-2 bg-green-500 text-white rounded-lg text-sm"
//         >
//           Finden
//         </button>
//       </div>
       
//       <Map/>

//     </div>
//   );
// };

// export default ExplorePage;
import { Search, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../_components/map/Map"), {
  ssr: false,
});

const ExplorePage = () => {
  return (
    <div className="m-10 max-w-[800px] mx-auto mb-10 items-center flex flex-col gap-4 px-5">
      <h2 className="font-bold text-4xl tracking-wide">
        Finde deinen <span className="text-green-800">Meister</span>{" "}
      </h2>
      <h2 className="text-black text-xl">
        Suchen Sie Ihren Master und buchen Sie einen Termin mit einem Klick
      </h2>

     
       
      <Map/>

    </div>
  );
};

export default ExplorePage;

