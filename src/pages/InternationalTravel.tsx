import { useState, type ChangeEvent, type FormEvent } from "react";
import { getTodayDate } from "../utils/dateHelpers";
import { useRef } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import SecurityVerification from "../components/SecurityVerification";

import { toast } from "react-toastify";

const InternationalTravel = () => {
  const turnstileRef = useRef<TurnstileInstance>(null);
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
    estimatedBudget: "",
    budgetCurrency: "USD",
    otherCurrency: "",
    planningServices: [] as string[],
    additionalRequirements: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "travelDate" && prev.returnDate && prev.returnDate < value
        ? { returnDate: "" }
        : {}),
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      planningServices: checked
        ? [...prev.planningServices, service]
        : prev.planningServices.filter((item) => item !== service),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const turnstileToken = turnstileRef.current?.getResponse();

    if (!turnstileToken) {
      toast.error("Please complete the security verification.");
      return;
    }

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.destination.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (
      form.returnDate &&
      form.travelDate &&
      form.returnDate < form.travelDate
    ) {
      toast.error("Return date cannot be before your travel date.");
      return;
    }

    if (
      form.estimatedBudget.trim() &&
      (!Number.isFinite(Number(form.estimatedBudget)) ||
        Number(form.estimatedBudget) <= 0)
    ) {
      toast.error("Please enter a valid travel budget.");
      return;
    }

    if (form.budgetCurrency === "Other" && !form.otherCurrency.trim()) {
      toast.error("Please specify your budget currency.");
      return;
    }

    const planningDetails = [
      form.estimatedBudget
        ? `Estimated travel budget: ${
            form.budgetCurrency === "Other"
              ? form.otherCurrency.trim()
              : form.budgetCurrency
          } ${form.estimatedBudget}`
        : "",
      form.planningServices.length
        ? `Planning services requested: ${form.planningServices.join(", ")}`
        : "",
      form.additionalRequirements.trim()
        ? `Additional requirements: ${form.additionalRequirements.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/international-travel-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            departure: form.departure,
            destination: form.destination,
            travelDate: form.travelDate,
            returnDate: form.returnDate,
            travelers: Number(form.travelers),
            tripPurpose: form.tripPurpose,
            additionalRequirements: planningDetails,
            budgetCurrency: form.budgetCurrency,
            otherCurrency: form.otherCurrency,
            turnstileToken,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit travel planning request.",
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
        estimatedBudget: "",
        budgetCurrency: "USD",
        otherCurrency: "",
        planningServices: [],
        additionalRequirements: "",
      });
    } catch (error) {
      console.error("International travel request error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit travel planning request.",
      );
    } finally {
      turnstileRef.current?.reset();
    }
  };

  const inputClass =
    "w-full rounded-xl border border-cyan-300/15 bg-[#101c2e] px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-100";

  const services = [
    {
      value: "Flight arrangements",
      label: "Flight arrangements",
      description: "Help finding suitable flights",
    },
    {
      value: "Accommodation",
      label: "Accommodation",
      description: "Hotels and places to stay",
    },
    {
      value: "Itinerary planning",
      label: "Itinerary planning",
      description: "Activities and travel schedules",
    },
    {
      value: "Visa guidance",
      label: "Visa guidance",
      description: "Guidance on travel documentation",
    },
    {
      value: "Complete travel plan",
      label: "Complete travel plan",
      description: "Help organising multiple trip arrangements",
    },
    {
      value: "Other",
      label: "Other",
      description: "Something else you need help with",
    },
  ];

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-6 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Top Navigation */}
        <header className="mb-12 flex items-center justify-between gap-4">
          <a
            href="/"
            className="text-lg font-extrabold tracking-tight text-white sm:text-xl"
          >
            Voyage <span className="text-cyan-400">Travel Mansion</span>
          </a>

          <a
            href="/"
            className="rounded-full border border-cyan-300/20 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            ← Back to Home
          </a>
        </header>

        {/* Hero Section */}
        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-[#142b43] via-[#0d1c30] to-[#07111f] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
              International Travel Planning
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your world is waiting.
              <span className="block text-cyan-400">
                Let's plan the journey.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Planning a holiday, studying abroad, visiting family, or
              travelling for business? Tell us about your plans and the support
              you need. We'll help you explore the next steps.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2">
                Tailored travel planning
              </span>
              <span className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2">
                Business & holidays
              </span>
              <span className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2">
                Personal assistance
              </span>
            </div>
          </div>
        </section>

        {/* International Travel Planning Form */}
        <section className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#0d1a2b] shadow-2xl shadow-black/20">
          <div className="border-b border-cyan-300/15 px-6 py-7 sm:px-8 lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Designed around your journey
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Let's Plan Your Trip
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Tell us where you're going, why you're travelling, and which
              arrangements you'd like our team to help with.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-x-6 gap-y-6 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-10"
          >
            {/* Section 1: Contact Details */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                01. Your Contact Details
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                So our team knows how to reach you.
              </p>
            </div>

            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="phone" className={labelClass}>
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Include your country code"
                className={inputClass}
              />
            </div>

            {/* Section 2: Trip Details */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                02. Tell Us About Your Trip
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                The destination, purpose, and timing of your journey.
              </p>
            </div>

            <div>
              <label htmlFor="departure" className={labelClass}>
                Departure City or Country
              </label>
              <input
                id="departure"
                name="departure"
                type="text"
                value={form.departure}
                onChange={handleChange}
                placeholder="Where will your trip start?"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="destination" className={labelClass}>
                Destination Country or Countries *
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                required
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g. United Kingdom, France"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="tripPurpose" className={labelClass}>
                What Is the Purpose of Your Trip?
              </label>
              <select
                id="tripPurpose"
                name="tripPurpose"
                value={form.tripPurpose}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Holiday">Holiday / Leisure</option>
                <option value="Business">Business</option>
                <option value="Student">Study / Education</option>
                <option value="Family">Family Visit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="travelers" className={labelClass}>
                Number of Travellers
              </label>
              <input
                id="travelers"
                name="travelers"
                type="number"
                min="1"
                max="100"
                required
                value={form.travelers}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="travelDate" className={labelClass}>
                Preferred Departure Date
              </label>
              <input
                id="travelDate"
                name="travelDate"
                type="date"
                min={getTodayDate()}
                value={form.travelDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="returnDate" className={labelClass}>
                Expected Return Date
              </label>
              <input
                id="returnDate"
                name="returnDate"
                type="date"
              min={form.travelDate || getTodayDate()}
                value={form.returnDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Section 3: Budget */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                03. Your Estimated Budget
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                This helps us understand the type of arrangements that may suit
                your trip. You can leave this blank.
              </p>
            </div>

            <div>
              <label htmlFor="budgetCurrency" className={labelClass}>
                Budget Currency
              </label>

              <select
                id="budgetCurrency"
                name="budgetCurrency"
                value={form.budgetCurrency}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="USD">USD — US Dollar</option>
                <option value="ZAR">ZAR — South African Rand</option>
                <option value="NGN">NGN — Nigerian Naira</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="EUR">EUR — Euro</option>
                <option value="Other">Other currency</option>
              </select>

              {form.budgetCurrency === "Other" && (
                <div className="mt-4">
                  <label htmlFor="otherCurrency" className={labelClass}>
                    Specify Your Currency *
                  </label>

                  <input
                    id="otherCurrency"
                    name="otherCurrency"
                    type="text"
                    required
                    value={form.otherCurrency}
                    onChange={handleChange}
                    placeholder="e.g. CAD, AUD, AED"
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="estimatedBudget" className={labelClass}>
                Estimated Total Trip Budget
              </label>
              <input
                id="estimatedBudget"
                name="estimatedBudget"
                type="number"
                min="1"
                step="any"
                value={form.estimatedBudget}
                onChange={handleChange}
                placeholder="e.g. 2500"
                className={inputClass}
              />
            </div>

            {/* Section 4: Planning Services */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                04. What Would You Like Help With?
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Select all the services you're interested in.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
              {services.map((service) => (
                <label
                  key={service.value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition duration-300 ${
                    form.planningServices.includes(service.value)
                      ? "border-cyan-400/70 bg-cyan-500/10"
                      : "border-cyan-300/15 bg-[#101c2e] hover:border-cyan-400/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.planningServices.includes(service.value)}
                    onChange={(e) =>
                      handleServiceChange(service.value, e.target.checked)
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-cyan-500"
                  />

                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {service.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">
                      {service.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {/* Section 5: Additional Details */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                05. Anything Else We Should Know?
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Share special requests, preferences, or questions.
              </p>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="additionalRequirements" className={labelClass}>
                Additional Information
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={form.additionalRequirements}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your preferences, accommodation needs, planned activities, or any questions you have..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit */}
            <div className="pt-2 lg:col-span-2">
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#0d1a2b] sm:w-auto sm:min-w-64"
              >
                Plan My International Trip
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <p className="mt-4 text-xs leading-6 text-slate-400">
                Our team will review your enquiry and contact you about the next
                steps. Submitting this form does not confirm a booking or
                guarantee visa approval.
              </p>

              <div className="md:col-span-2">
                <SecurityVerification turnstileRef={turnstileRef} />
              </div>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-slate-500">
          Voyage Travel Mansion · Your trusted partner for better journeys.
        </footer>
      </div>
    </main>
  );
};

export default InternationalTravel;
