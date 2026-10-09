
import { useState } from "react";
import { toast } from "react-toastify";
import {
  ShieldCheck,
  Plane,
  CalendarDays,
  Users,
  ArrowLeft,
  CheckCircle2,
  HeartPulse,
  Luggage,
  Headphones,
} from "lucide-react";

export default function TravelInsurance() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "1",
    coverageType: "Comprehensive travel insurance",
    additionalRequirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "departureDate" &&
      previous.returnDate &&
      value &&
      previous.returnDate < value
        ? { returnDate: "" }
        : {}),
    }));
  };

  const inputClass =
    "w-full rounded-xl border border-cyan-300/15 bg-[#101c2e] px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-100";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      form.departureDate &&
      form.returnDate &&
      form.returnDate < form.departureDate
    ) {
      toast.error("Return date cannot be earlier than departure date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/insurance-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            travelers: Number(form.travelers),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit insurance request.",
        );
      }

      toast.success(
        "Your travel insurance request has been submitted successfully!",
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        travelers: "1",
        coverageType: "Comprehensive travel insurance",
        additionalRequirements: "",
      });
    } catch (error) {
      console.error("Travel insurance submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="/"
            className="group flex items-center gap-3 font-bold tracking-wide"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 transition duration-300 group-hover:bg-cyan-400/20">
              <ShieldCheck size={25} />
            </span>

            <span>
              VOYAGE
              <span className="block text-xs font-medium tracking-[0.25em] text-cyan-300">
                TRAVEL MANSION
              </span>
            </span>
          </a>

          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#142b43] via-[#0d1c30] to-[#07111f]">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              <ShieldCheck size={16} />
              Travel with greater peace of mind
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A little more
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                peace of mind
              </span>
              for every journey.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Let Voyage Travel Mansion help you explore travel
              insurance options for your next trip. Tell us about
              your journey and our team will guide you through the
              next steps.
            </p>

            <a
              href="#insurance-request"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-1 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/20"
            >
              Request Insurance Assistance
              <span aria-hidden="true">→</span>
            </a>

            <p className="mt-4 text-xs leading-6 text-slate-400">
              Coverage, eligibility and policy terms depend on the
              insurance provider and selected policy.
            </p>
          </div>

          {/* Feature Card */}
          <div className="relative">
            <div className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-[#14283e] to-[#0d1a2b] p-7 shadow-2xl shadow-black/30 sm:p-9">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10 text-cyan-300">
                <ShieldCheck size={34} />
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Support for the unexpected
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Understand your options before you travel, with
                guidance tailored to your destination and travel
                plans.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: HeartPulse,
                    title: "Medical coverage options",
                    description:
                      "Ask about eligible emergency medical benefits.",
                  },
                  {
                    icon: Luggage,
                    title: "Baggage and travel disruptions",
                    description:
                      "Explore options for baggage loss and trip delays.",
                  },
                  {
                    icon: Headphones,
                    title: "Personal guidance",
                    description:
                      "Get help understanding available policy options.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-400/10 text-cyan-300">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 -z-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Insurance Request Form */}
      <section
        id="insurance-request"
        className="scroll-mt-24 border-t border-white/10 bg-[#07111f] px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Your next step
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Request Travel Insurance Assistance
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Share a few details about your trip. Our team can
              then review your request and discuss the available
              options.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-cyan-300/10 bg-[#0d1a2b] p-5 shadow-2xl shadow-black/20 sm:p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-400/10 text-cyan-300">
                <Plane size={23} />
              </div>

              <div>
                <h3 className="font-semibold">Your travel details</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Fields marked * are required.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label htmlFor="insurance-name" className={labelClass}>
                  Full Name *
                </label>
                <input
                  id="insurance-name"
                  name="fullName"
                  value={form.fullName}
                  onChange={updateField}
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="insurance-email" className={labelClass}>
                  Email Address *
                </label>
                <input
                  id="insurance-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="insurance-phone" className={labelClass}>
                  Phone / WhatsApp *
                </label>
                <input
                  id="insurance-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  autoComplete="tel"
                  required
                  placeholder="Your contact number"
                  className={inputClass}
                />
              </div>

              {/* Destination */}
              <div>
                <label
                  htmlFor="insurance-destination"
                  className={labelClass}
                >
                  Destination *
                </label>
                <input
                  id="insurance-destination"
                  name="destination"
                  value={form.destination}
                  onChange={updateField}
                  required
                  placeholder="e.g. United Kingdom"
                  className={inputClass}
                />
              </div>

              {/* Departure Date */}
              <div>
                <label
                  htmlFor="insurance-departure"
                  className={labelClass}
                >
                  Departure Date
                </label>
                <div className="relative">
                  <CalendarDays
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                    size={18}
                  />
                  <input
                    id="insurance-departure"
                    type="date"
                    name="departureDate"
                    value={form.departureDate}
                    onChange={updateField}
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label
                  htmlFor="insurance-return"
                  className={labelClass}
                >
                  Return Date
                </label>
                <div className="relative">
                  <CalendarDays
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                    size={18}
                  />
                  <input
                    id="insurance-return"
                    type="date"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={updateField}
                    min={form.departureDate || undefined}
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label
                  htmlFor="insurance-travelers"
                  className={labelClass}
                >
                  Number of Travelers *
                </label>
                <div className="relative">
                  <Users
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                    size={18}
                  />
                  <select
                    id="insurance-travelers"
                    name="travelers"
                    value={form.travelers}
                    onChange={updateField}
                    required
                    className={`${inputClass} appearance-none pl-11`}
                  >
                    {Array.from(
                      { length: 10 },
                      (_, index) => index + 1,
                    ).map((number) => (
                      <option
                        key={number}
                        value={number}
                        className="bg-[#101c2e]"
                      >
                        {number} {number === 1 ? "traveler" : "travelers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Coverage Type */}
              <div>
                <label
                  htmlFor="insurance-coverage"
                  className={labelClass}
                >
                  Type of Assistance *
                </label>
                <select
                  id="insurance-coverage"
                  name="coverageType"
                  value={form.coverageType}
                  onChange={updateField}
                  required
                  className={inputClass}
                >
                  <option className="bg-[#101c2e]">
                    Comprehensive travel insurance
                  </option>
                  <option className="bg-[#101c2e]">
                    Emergency medical coverage
                  </option>
                  <option className="bg-[#101c2e]">
                    Single-trip coverage
                  </option>
                  <option className="bg-[#101c2e]">
                    Multi-trip coverage
                  </option>
                  <option className="bg-[#101c2e]">
                    Not sure — need guidance
                  </option>
                </select>
              </div>

              {/* Additional Requirements */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="insurance-requirements"
                  className={labelClass}
                >
                  Additional Information (Optional)
                </label>
                <textarea
                  id="insurance-requirements"
                  name="additionalRequirements"
                  value={form.additionalRequirements}
                  onChange={updateField}
                  rows={4}
                  placeholder="Tell us about any particular travel insurance requirements..."
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#0d1a2b] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-64"
            >
              <ShieldCheck size={20} />
              {isSubmitting
                ? "Submitting Request..."
                : "Request Insurance Assistance"}
            </button>

            {/* Important Notice */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-cyan-300/10 bg-cyan-400/5 p-4 text-sm leading-6 text-slate-400">
              <CheckCircle2
                className="mt-0.5 shrink-0 text-cyan-300"
                size={19}
              />
              <p>
                Submitting this form requests assistance only. It
                does not purchase a policy or guarantee coverage.
                Policy availability, terms and eligibility are
                subject to the insurance provider.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07111f] px-5 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-white">
          Voyage Travel Mansion
        </p>

        <p className="mt-2">
          Your trusted partner for better journeys.
        </p>

        <a
          href="mailto:561travelsandtours@gmail.com"
          className="mt-3 inline-block text-cyan-300 transition hover:text-cyan-200"
        >
          561travelsandtours@gmail.com
        </a>

        <p className="mt-5 text-xs">
          © {new Date().getFullYear()} Voyage Travel Mansion. All
          rights reserved.
        </p>
      </footer>
    </main>
  );
}
