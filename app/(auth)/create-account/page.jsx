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

  // Функция для локальной валидации пароля
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
    return regex.test(password);
  };

  // Обработчик отправки данных для создания аккаунта
  const onCreateAccount = async () => {
    if (!validatePassword(hashPassword)) {
      toast("Пароль должен содержать букву, цифру, специальный символ и быть не менее 8 символов.");
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
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Ошибка ответа сервера:", errorData);
        throw new Error("Erstellung des Kontos fehlgeschlagen.");
      }

      const data = await res.json();
      console.log("Ответ сервера:", data);
      setUser(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      toast("Konto erfolgreich erstellt");
      router.push("/");
    } catch (error) {
      console.error("Fehler bei der Kontoerstellung:", error);
      toast("Error while creating account");
    }
  };

  // Перенаправление на главную страницу, если пользователь уже вошел
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex items-baseline justify-center my-20">
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

          <div className="flex gap-4 px-5">
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
                type="radio"
                value="MASTER"
                checked={role === "MASTER"}
                onChange={() => setRole("MASTER")}
              />
              Master
            </label>
          </div>

          <Button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300"
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
