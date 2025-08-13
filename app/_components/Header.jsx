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
    <header>
      <div className="flex items-center justify-between ml-4 mr-4">
        <div className="flex items-center gap-20 right-4">
          <Link href="/">
            <Image
              src="/logo3.png"
              alt="logo"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          {/* Desktop menu */}
          <ul className="md:flex gap-8 hidden">
            {Menu.map((item, index) => (
              <li key={index} className="hover:text-green-700 cursor-pointer hover:scale-105 transition-all ease-in-out">
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          {/* Mobile menu: Theme left, then menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Theme />
            <Popover>
              <PopoverTrigger asChild>
                <button aria-label="Open menu" className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-40 p-5 border-0 rounded-2xl shadow-2xl backdrop-blur-lg animate-menu-pop"
                style={{ background: 'rgba(59,218,109,0.35)', transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)', transform: 'scale(0.95)', animation: 'menuPop 0.4s cubic-bezier(.4,0,.2,1)' }}
              >
                <ul className="flex flex-col gap-4 items-end">
                  {Menu.map((item, index) => (
                    <li
                      key={index}
                      className="hover:text-green-300 cursor-pointer hover:scale-105 transition-all ease-in-out text-lg text-right py-2 rounded-xl w-full"
                      style={{ transition: 'background 0.3s, color 0.3s' }}
                    >
                      <Link href={item.path} className="block w-full text-right pr-2">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme for desktop: hidden on mobile, flex on md+ */}
          <span className="hidden md:flex h-6 w-6 items-center justify-center mr-2">
            <Theme />
          </span>
          {!user ? (
            <Link href={"/sign-in"}>
              <span className="inline-flex items-center justify-center rounded-full p-2 transition-colors">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                    className="text-green-700 dark:text-green-700"
                  style={{ display: 'block' }}
                >
                  <circle cx="16" cy="12" r="6" />
                  <path d="M6 26c0-3.5 6-6 10-6s10 2.5 10 6" />
                  <path d="M16 18v2" />
                </svg>
              </span>
            </Link>
          ) : (
            <Popover asChild>
              <div className="flex items-center">
                <PopoverTrigger>
                  <CircleUserRound className="p-2 text-green-800 h-12 w-12" />
                </PopoverTrigger>
              </div>
              <PopoverContent className="w-44">
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      href={"/profile"}
                      className="cursor-pointer p-2 hover:bg-slate-100 rounded-md"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/my-booking"}
                      className="cursor-pointer p-2 hover:bg-slate-100 rounded-md"
                    >
                      My Booking
                    </Link>
                  </li>
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
      </div>
    </header>
  );
}

export default Header;
