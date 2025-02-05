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
  const [showPassword, setShowPassword] = useState(false); // Состояние для видимости пароля
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLoginAccount = async () => {
    if (!validateEmail(email)) {
      toast("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (!validatePassword(password)) {
      toast("Das Passwort muss mindestens 8 Zeichen enthalten.");
      return;
    }

    try {
      const userData = {
        email,
        hashPassword: password,
      };

      const res = await fetch("https://beautybook-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(userData),
      });

      if (res.status === 401) {
        throw new Error("Неправильный логин или пароль");
      }

      if (res.status === 404) {
        throw new Error("Аккаунт не найден");
      }

      if (!res.ok) {
        throw new Error("Login fehlgeschlagen");
      }

      const data = await res.json();
      console.log(data);
      setUser("user");
      sessionStorage.setItem("user", JSON.stringify(data));
      toast("Erfolgreich angemeldet");
      router.push("/");
    } catch (error) {
      console.error("Fehler beim Login:", error);
      toast(error.message);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-blur-sm">
        <h2 className="font-bold text-3xl">Anmeldung</h2>
        <h2 className="text-black">Geben Sie Ihre E-Mail und Ihr Passwort ein</h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black bg-white"
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black bg-white pr-12"
              title="Das Passwort muss mindestens 8 Zeichen enthalten"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black"
              aria-label={showPassword ? "Passwort verstecken" : "Passwort zeigen"}
            >
              {showPassword ? "👁️" : "🔒"}
            </button>
          </div>
          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
            style={{ backgroundColor: "#006400", color: "#ffffff" }}
            onClick={onLoginAccount}
            disabled={!email || !password || !validateEmail(email) || !validatePassword(password)}
          >
            Anmeldung
          </Button>
          <p>
            Ich habe keine Konto{" "}
            <Link href={"/create-account"} className="text-green-600 ml-3">
              -Klicken Sie hier, um sich zu registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
