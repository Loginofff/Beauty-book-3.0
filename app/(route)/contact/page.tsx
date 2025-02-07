"use client";

import React from "react";
import { toast } from "sonner";

export default function Contact() {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email,
      phone,
      firstName,
      lastName,
      message,
    };

    console.log("Отправляемые данные:", data);

    try {
      const userData = sessionStorage.getItem("user");
      const token = userData ? JSON.parse(userData).accessToken : null;

      const response = await fetch(
        "https://beautybook-production.up.railway.app/api/users/message-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
      }

      const resultText = await response.text();
      const parsedResult = resultText ? JSON.parse(resultText) : "Ответ сервера пуст";

      console.log("Полученный результат:", parsedResult);
      toast("Nachricht gesendet");

      setEmail("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setMessage("");
    } catch (error) {
      toast("Fehler beim Senden der Nachricht");
      console.error("Ошибка при отправке формы:", error);
    }
  };

  return (
    <div className="mt-7 px-4 sm:px-0">
      <form
        className="container max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-3 sm:space-y-4"
        onSubmit={handleSubmit}
        style={{ backgroundColor: "transparent" }}
      >
        <h1 className="text-green-600 text-xl font-extrabold sm:text-5xl text-center">
          Kontaktieren Sie uns
          <strong className="block font-extrabold text-green-900"> bei Fragen. </strong>
        </h1>

        <div className="email block text-green-700">
          <label htmlFor="frm-email">Email</label>
          <input
            id="frm-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="block phone text-green-700">
          <label htmlFor="frm-phone">Telefonnummer:</label>
          <input
            id="frm-phone"
            type="text"
            name="phone"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="name grid sm:grid-cols-2 gap-4">
          <div className="text-green-700">
            <label htmlFor="frm-first">Name:</label>
            <input
              id="frm-first"
              type="text"
              name="first"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="text-green-700">
            <label htmlFor="frm-last">Nachname:</label>
            <input
              id="frm-last"
              type="text"
              name="last"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="message block text-green-700">
          <label htmlFor="frm-message">Nachricht</label>
          <textarea
            id="frm-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
          />
        </div>

        <div className="button block white">
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-lg cursor-pointer hover:bg-green-800 transition text-lg"
          >
            Senden
          </button>
        </div>
      </form>
    </div>
  );
}
