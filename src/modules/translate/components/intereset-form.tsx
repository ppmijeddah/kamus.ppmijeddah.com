"use client";

import React from "react";
import { sendWhatsappMessage } from "../services/interest"; // Import the service

export function InterestForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = {
      email: formData.get("email") as string,
      useCase: formData.get("use_case") as string,
    };
    const { email, useCase } = formValues;

    sendWhatsappMessage({ email, useCase });
    event.currentTarget.reset();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
        Dapatkan Notifikasi!
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Daftarkan email Anda untuk menjadi yang pertama tahu saat fitur ini
        diluncurkan dan dapatkan update perkembangannya.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
          >
            Alamat Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors"
            placeholder="anda@email.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="use_case"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
          >
            Kebutuhan Terjemahan Anda (Opsional)
          </label>
          <textarea
            id="use_case"
            name="use_case"
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors"
            placeholder="Contoh: Saya butuh untuk menerjemahkan percakapan sehari-hari, dokumen resmi, dll."
          ></textarea>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-left">
            Bantu kami memahami kebutuhan Anda agar fitur ini lebih baik.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-pacamara-secondary hover:bg-pacamara-accent text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          Daftarkan Saya!
        </button>
      </form>
    </div>
  );
}
