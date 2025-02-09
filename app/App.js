"use client"

import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import BackgroundAnimation from "./_components/BackgroundAnimation";
import Footer from "./_components/Footer";
import { Toaster } from ".//components/ui/sonner"
import { AuthContext } from ".//context/AuthContext";


export default function App({children}) {

  const [user, setUser] = useState(null);
  useEffect(()=>{
  setUser(sessionStorage.getItem("user"))
  },[])
  return (
    
    <AuthContext.Provider value={{ user, setUser }}>
      <BackgroundAnimation />
      <div>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}