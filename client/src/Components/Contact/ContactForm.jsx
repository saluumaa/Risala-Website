import React from 'react';

export default function ContactForm() {
  return (
    <form className="space-y-6 text-bodyColor">
      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-blue-700 mb-1">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="How can we help you?"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}