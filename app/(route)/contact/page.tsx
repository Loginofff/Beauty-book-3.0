"use client";

import React from 'react';
import { toast } from "sonner";

export default function Contact() {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();  
    const data = {
      email: email,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      message: message
    };

    console.log('Отправляемые данные:', data);

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/message-admin",
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user"))?.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Статус ответа:', response.status);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      const parsedResult = result ? JSON.parse(result) : null;
      
      if (parsedResult) {
        console.log('Полученный результат:', parsedResult);
        toast("Nachricht gesendet");
      } else {
        console.log('Полученный результат:', result);
        toast("Nachricht gesendet");
      }
      
      setEmail('');
      setPhone('');
      setFirstName('');
      setLastName('');
      setMessage('');
      
    } catch (error) {
      toast("Error Nachricht gesendet");
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="mt-7">
      <form className="container" onSubmit={handleSubmit}
      style={{ backgroundColor: " transparent" }}
      >
        <h1 className="text-green-600 text-xl font-extrabold sm:text-5xl">
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
          />
        </div>
        <div className="name block">
          <div className='text-green-700'>
            <label htmlFor="frm-first ">Name:</label>
            <input
              id="frm-first"
              type="text"
              name="first"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='text-green-700'>
            <label htmlFor="frm-last">Nachname:</label>
            <input
              id="frm-last"
              type="text"
              name="last"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          />
        </div>
        <div className="button block white ">
          <button type="submit" className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-green-800 transition">
            Senden
          </button>
        </div>
      </form>
    </div>
  );
}