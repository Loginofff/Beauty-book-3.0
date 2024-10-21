"use client";

import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";

function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hashPassword, setHashPassword] = useState("");
  const [role, setRole] = useState("CLIENT");
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const onCreateAccount = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        role,
        hashPassword,
      };

      const res = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER + "/api/users/register",
       " http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify(userData),
        }
        
      );
      console.log(userData);
      if (!res.ok) {
        throw new Error("Failed to create account");
      }

      const data = await res.json();
      console.log(data);
      setUser("user");
      sessionStorage.setItem("user", JSON.stringify(data));
      toast("Account created successfully");
      router.push("/");
    } catch (error) {
      console.error("Error creating account:", error);
      toast("Error while creating account");
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex items-baseline justify-center my-20 ">
      <div className="flex flex-col items-center justify-center p-10 bg-blur-sm">
        <h2 className="font-bold text-3xl">Ein Konto erstellen</h2>
        <h2 className="text-gray-500">
          Enter your information to Create an Account
        </h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
          style={{ color: "black", backgroundColor: "white" }}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            pattern="[A-Za-z]+"
            title="Please enter only letters for the first name"
          />
          <Input
          style={{ color: "black", backgroundColor: "white" }}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            pattern="[A-Za-z]+"
            title="Please enter only letters for the last name"
          />
          <Input
          style={{ color: "black", backgroundColor: "white" }}
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
          style={{ color: "black", backgroundColor: "white" }}
            type="password"
            required
            placeholder="Password"
            value={hashPassword}
            onChange={(e) => setHashPassword(e.target.value)}
            title="Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
          />

          <div className=" flex  gap-4 px-5">
            <label>
              <input
              
                type="radio"
                value="CLIENT"
                checked={role === "CLIENT"}
                onChange={() => setRole("CLIENT")}
              />
              Client
            </label>
            <label>
              <input
              style={{ color: "black", backgroundColor: "white" }}
                type="radio"
                value="MASTER"
                checked={role === "MASTER"}
                onChange={() => setRole("MASTER")}
              />
              Master
            </label>
          </div>

          <Button
            className=" inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
            style={{ backgroundColor: "#006400", color: "#ffffff" }}
            onClick={onCreateAccount}
            disabled={!firstName || !lastName || !email || !hashPassword}
          >
            Eine Konto erstellen
          </Button>
          <p>
            Ich habe ein Konto{" "}
            <Link href={"/sign-in"} className="text-green-600 ml-3">
              -Klicken Sie hier, um sich anzumelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;

