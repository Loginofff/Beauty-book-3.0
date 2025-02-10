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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  // Валидация email
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Валидация пароля
  const validatePassword = (password) => password.length >= 8;

  // Перевод ошибок на немецкий
  const translateError = (message) => {
    const translations = {
      "Incorrect login or password": "Falsche E-Mail oder falsches Passwort.",
      "Account not found": "Konto nicht gefunden.",
      "Login failed": "Anmeldung fehlgeschlagen.",
    };
    return translations[message] || "Ein unbekannter Fehler ist aufgetreten.";
  };

  // Отправка данных для входа
  const onLoginAccount = async () => {
    if (!validateEmail(email)) {
      toast.error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Das Passwort muss mindestens 8 Zeichen enthalten.");
      return;
    }

    try {
      const userData = { email, hashPassword: password };

      const res = await fetch(
        "https://beautybook-production-c53c.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      // Проверка кода ответа
      if (!res.ok) {
        let errorMessage = "Anmeldung fehlgeschlagen.";
        if (res.headers.get("content-type")?.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = translateError(errorData.message || errorMessage);
        }
        toast.error(errorMessage);
        return;
      }

      // Успешный вход
      const data = await res.json();
      setUser(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.success("Erfolgreich angemeldet!");
      router.push("/");
    } catch (error) {
      console.error("Fehler beim Login:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
  };

  // Перенаправление, если пользователь уже авторизован
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-blur-sm">
        <h2 className="font-bold text-3xl">Anmeldung</h2>
        <h2 className="text-gray-500">Geben Sie Ihre E-Mail und Ihr Passwort ein</h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            style={{ color: "black", backgroundColor: "white" }}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              style={{ color: "black", backgroundColor: "white" }}
              type={showPassword ? "text" : "password"}
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black"
              aria-label={showPassword ? "Passwort verstecken" : "Passwort anzeigen"}
            >
              {showPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
            style={{ backgroundColor: "#006400", color: "#ffffff" }}
            onClick={onLoginAccount}
            disabled={!email || !password}
          >
            Anmeldung
          </Button>

          <p>
            Ich habe kein Konto{" "}
            <Link href={"/create-account"} className="text-green-600 ml-3">
              - Hier registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
