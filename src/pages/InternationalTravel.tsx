import { useState } from "react";
import { toast } from "react-toastify";

const InternationalTravel = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    departure: "",
    destination: "",
    travelDate: "",
    returnDate: "",
    travelers: "1",
    tripPurpose: "Holiday",
    additionalRequirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.fullName || !form.email || !form.phone || !form.destination) {
    toast.error("Please fill in all required fields.");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/international-travel-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          travelers: Number(form.travelers),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to submit travel planning request"
      );
    }

    toast.success("Travel planning request submitted successfully!");

    setForm({
      fullName: "",
      email: "",
      phone: "",
      departure: "",
      destination: "",
      travelDate: "",
      returnDate: "",
      travelers: "1",
      tripPurpose: "Holiday",
      additionalRequirements: "",
    });
  } catch (error) {
    console.error("International travel request error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to submit travel planning request."
    );
  }
};

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            International Travel Planning
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Let’s plan your international journey
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Tell us about your trip and our team will help you plan your
            international journey around your destination, dates and travel
            needs.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:grid-cols-2 lg:p-10"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Full Name *
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Email Address *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Phone Number *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+27 69 587 7716"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Departure */}
          <div>
            <label
              htmlFor="departure"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Departure Location
            </label>

            <input
              id="departure"
              name="departure"
              type="text"
              value={form.departure}
              onChange={handleChange}
              placeholder="City or country you're departing from"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Destination */}
          <div>
            <label
              htmlFor="destination"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Destination *
            </label>

            <input
              id="destination"
              name="destination"
              type="text"
              value={form.destination}
              onChange={handleChange}
              placeholder="Where would you like to travel?"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Travel Date */}
          <div>
            <label
              htmlFor="travelDate"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Travel Date
            </label>

            <input
              id="travelDate"
              name="travelDate"
              type="date"
              value={form.travelDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          {/* Return Date */}
          <div>
            <label
              htmlFor="returnDate"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Return Date
            </label>

            <input
              id="returnDate"
              name="returnDate"
              type="date"
              value={form.returnDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          {/* Travelers */}
          <div>
            <label
              htmlFor="travelers"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Number of Travelers
            </label>

            <input
              id="travelers"
              name="travelers"
              type="number"
              min="1"
              value={form.travelers}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          {/* Trip Purpose */}
          <div>
            <label
              htmlFor="tripPurpose"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Purpose of Travel
            </label>

            <select
              id="tripPurpose"
              name="tripPurpose"
              value={form.tripPurpose}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="Holiday">Holiday</option>
              <option value="Business">Business</option>
              <option value="Student">Student</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Additional Requirements */}
          <div className="lg:col-span-2">
            <label
              htmlFor="additionalRequirements"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Additional Travel Requirements
            </label>

            <textarea
              id="additionalRequirements"
              name="additionalRequirements"
              value={form.additionalRequirements}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us anything else you need help with..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            />
          </div>

          {/* Submit */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyan-500 px-8 py-4 font-bold text-slate-950 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-cyan-400/20"
            >
              Start My Travel Request
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default InternationalTravel;