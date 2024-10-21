"use client";

import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const onLoginAccount = async () => {
    try {
      const userData = {
        email,
        hashPassword: password,
      };

      const res = await fetch(
        // process.env.NEXT_PUBLIC_PRODUCTION_SERVER + "/api/auth/login",
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const data = await res.json();
      console.log(data);
      setUser("user");
      sessionStorage.setItem("user", JSON.stringify(data));
      toast("Login successfully");
      router.push("/");
    } catch (error) {
      console.error("Error login account:", error);
      toast("Falscher Login oder Passwort");
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
        <h2 className="font-bold text-3xl">Authorization</h2>
        <h2 className="text-black">Enter your Email and Password</h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "black", backgroundColor: "white" }}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "black", backgroundColor: "white" }}
            title="Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <Button
            className=" inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
            style={{ backgroundColor: "#006400", color: "#ffffff" }}
            onClick={onLoginAccount}
            disabled={!email || !password}
          >
            Login
          </Button>
          <p>
            Ich habe keine Konto{" "}
            <Link href={"/create-account"} className="text-green-600 ml-3">
              -Klicken Sie hier, um sich registriren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
