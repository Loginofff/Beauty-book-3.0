"use client";

import { useEffect, useContext } from "react";
import { Button } from "../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import Theme from "../_components/theme/Theme-component";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  console.log(user);
  useEffect(() => {}, []);

  const onSignOut = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    router.push("/sign-in");
  };

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explorePage",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <div className="flex items-center justify-between ml-4 mr-4 mt-1">
      <div className="flex items-center gap-20 right-4">
        <Link href="/">
        <Image
  src="/logo3.png"
  alt="logo"
  width={100}
  height={100}
  style={{ width: "auto", height: "auto" }} // Это поможет сохранить пропорции
/>

        </Link>

        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link key={index} href={item.path}>
              <li className="hover:text-green-700 cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {!user ? (
        <div className="flex items-center gap-4">
          <Theme />
          <Link href={"/sign-in"}>
            <Button
              className=" inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
              style={{ backgroundColor: "#006400", color: "#ffffff" }}
            >
              Login
            </Button>
          </Link>
        </div>
      ) : (
        
        <Popover asChild>
        <div className="flex items-center">
          <Theme />
          <PopoverTrigger>
            <CircleUserRound className="p-2 text-green-800 h-12 w-12" />
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-44">
          <ul className="flex flex-col gap-2">
            <Link
              href={"/profile"}
              className="cursor-pointer p-2 hover:bg-slate-100 rounded-md"
            >
              Profile
            </Link>
            <Link
              href={"/my-booking"}
              className="cursor-pointer p-2 hover:bg-slate-100 rounded-md"
            >
              My Booking
            </Link>
            <li
              onClick={() => onSignOut()}
              className="cursor-pointer p-2 hover:bg-slate-100 rounded-md"
            >
              Logout
            </li>
          </ul>
        </PopoverContent>
      </Popover>
      
      )}
    </div>
  );
}

export default Header;
