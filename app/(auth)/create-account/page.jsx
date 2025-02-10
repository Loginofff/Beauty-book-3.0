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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  // Функция для локальной валидации пароля
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
    return regex.test(password);
  };

  // Функция перевода ошибок на немецкий
  const translateError = (message) => {
    const translations = {
      "Email already exists": "Diese E-Mail-Adresse ist bereits registriert.",
      "Invalid email format": "Ungültiges E-Mail-Format.",
      "Password is too weak":
        "Das Passwort ist zu schwach. Es muss mindestens 8 Zeichen lang sein und einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten.",
      "User creation failed": "Fehler bei der Kontoerstellung.",
    };
    return translations[message] || "Ein unbekannter Fehler ist aufgetreten.";
  };

  // Обработчик отправки данных
  const onCreateAccount = async () => {
    if (!validatePassword(hashPassword)) {
      toast.error(
        "Das Passwort muss mindestens 8 Zeichen lang sein, eine Zahl, einen Buchstaben und ein Sonderzeichen enthalten."
      );
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      hashPassword,
      role,
    };

    try {
      const res = await fetch(
        "https://beautybook-production-c53c.up.railway.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      // Проверяем статус ответа
      if (!res.ok) {
        let errorMessage = "Fehler bei der Kontoerstellung.";
        if (res.headers.get("content-type")?.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = translateError(errorData.message || errorMessage);
        }
        toast.error(errorMessage);
        return;
      }

      // Парсим ответ
      const data = await res.json();
      setUser(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.success("Konto erfolgreich erstellt!");
      router.push("/");
    } catch (error) {
      console.error("Fehler bei der Kontoerstellung:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
  };

  // Перенаправление, если пользователь уже вошел
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-blur-sm">
        <h2 className="font-bold text-3xl">Ein Konto erstellen</h2>
        <h2 className="text-gray-500">Geben Sie Ihre Daten ein, um ein Konto zu erstellen</h2>

        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            style={{ color: "black", backgroundColor: "white" }}
            placeholder="Vorname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            pattern="[A-Za-z]+"
            title="Bitte geben Sie nur Buchstaben für den Vornamen ein"
          />
          <Input
            style={{ color: "black", backgroundColor: "white" }}
            placeholder="Nachname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            pattern="[A-Za-z]+"
            title="Bitte geben Sie nur Buchstaben für den Nachnamen ein"
          />
          <Input
            style={{ color: "black", backgroundColor: "white" }}
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              style={{ color: "black", backgroundColor: "white" }}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Passwort"
              value={hashPassword}
              onChange={(e) => setHashPassword(e.target.value)}
              title="Das Passwort muss mindestens eine Zahl, einen Buchstaben und 8 oder mehr Zeichen enthalten"
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

          <div className="flex gap-4 px-5">
            <label>
              <input type="radio" value="CLIENT" checked={role === "CLIENT"} onChange={() => setRole("CLIENT")} />
              Kunde
            </label>
            <label>
              <input type="radio" value="MASTER" checked={role === "MASTER"} onChange={() => setRole("MASTER")} />
              Meister
            </label>
          </div>

          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
            style={{ backgroundColor: "#006400", color: "#ffffff" }}
            onClick={onCreateAccount}
            disabled={!firstName || !lastName || !email || !hashPassword}
          >
            Ein Konto erstellen
          </Button>
          <p>
            Ich habe bereits ein Konto{" "}
            <Link href={"/sign-in"} className="text-green-600 ml-3">
              -Hier klicken, um sich anzumelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
