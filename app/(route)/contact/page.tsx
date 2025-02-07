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
    const data = { email, phone, firstName, lastName, message };

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
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-green-600 text-xl font-extrabold sm:text-3xl text-center">
          Kontaktieren Sie uns
          <strong className="block font-extrabold text-green-900">
            bei Fragen.
          </strong>
        </h1>

        <div className="mt-5 space-y-4">
          <div className="text-green-700">
            <label htmlFor="frm-email" className="block text-sm font-medium">
              Email
            </label>
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

          <div className="text-green-700">
            <label htmlFor="frm-phone" className="block text-sm font-medium">
              Telefonnummer
            </label>
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

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-green-700 w-full">
              <label htmlFor="frm-first" className="block text-sm font-medium">
                Name
              </label>
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

            <div className="text-green-700 w-full">
              <label htmlFor="frm-last" className="block text-sm font-medium">
                Nachname
              </label>
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

          <div className="text-green-700">
            <label htmlFor="frm-message" className="block text-sm font-medium">
              Nachricht
            </label>
            <textarea
              id="frm-message"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            />
          </div>

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
