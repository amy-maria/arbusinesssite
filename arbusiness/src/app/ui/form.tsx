"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    country: "United States",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here (API call, etc.)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-neutral-dark rounded-lg text-white space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-white">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-2 focus:outline-cta"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-white">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-2 focus:outline-cta"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="organization" className="block text-sm font-medium text-white">
            Organization Name (optional)
          </label>
          <input
            type="text"
            name="organization"
            id="organization"
            value={formData.organization}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-2 focus:outline-cta"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-white">
            Country
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white focus:outline-2 focus:outline-cta"
            required
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-2 focus:outline-cta"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-white">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-2 focus:outline-cta"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="reset"
          onClick={() => setFormData({
            firstName: "",
            lastName: "",
            organization: "",
            country: "United States",
            email: "",
            message: "",
          })}
          className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-cta hover:bg-cta-hover text-white transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
