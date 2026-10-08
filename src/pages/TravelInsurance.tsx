
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

  const [isSubmitting] = useState(false);

  const updateField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.info("The request form is being prepared. Backend connection is the next step.");
  };

  return (
    <main className="min-h-screen bg-[#100b18] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-[#100b18]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a
            href="/"
            className="flex items-center gap-3 font-bold tracking-wide"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-300">
              <ShieldCheck size={25} />
            </span>
            <span>
              VOYAGE
              <span className="block text-xs font-medium tracking-[0.25em] text-violet-300">
                TRAVEL MANSION
              </span>
            </span>
          </a>

          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-violet-100 transition hover:border-violet-300/60 hover:bg-violet-400/10"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-sm text-violet-200">
              <ShieldCheck size={16} />
              Travel with greater peace of mind
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              A little more
              <span className="block text-violet-300">
                peace of mind
              </span>
              for every journey.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Let Voyage Travel Mansion help you explore travel insurance
              options for your next trip. Tell us about your journey and
              our team will guide you through the next steps.
            </p>

            <a
              href="#insurance-request"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-violet-300 px-7 py-4 font-semibold text-[#21152f] shadow-lg shadow-violet-500/15 transition duration-300 hover:-translate-y-1 hover:bg-violet-200"
            >
              Request Insurance Assistance
              <span aria-hidden="true">→</span>
            </a>

            <p className="mt-4 text-xs leading-6 text-slate-400">
              Coverage, eligibility and policy terms depend on the
              insurance provider and selected policy.
            </p>
          </div>

          {/* Feature card */}
          <div className="relative">
            <div className="rounded-[2rem] border border-violet-200/15 bg-gradient-to-br from-[#30203f] to-[#1b1327] p-7 shadow-2xl shadow-black/20 sm:p-9">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-300/15 text-violet-200">
                <ShieldCheck size={34} />
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Support for the unexpected
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Understand your options before you travel, with guidance
                tailored to your destination and travel plans.
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
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200">
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

            <div className="absolute -bottom-5 -right-3 -z-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Request form */}
      <section
        id="insurance-request"
        className="border-t border-white/10 bg-[#171020] px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Your next step
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Request Travel Insurance Assistance
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Share a few details about your trip. Our team can then
              review your request and discuss the available options.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/10 sm:p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-300/10 text-violet-200">
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
              <div>
                <label htmlFor="insurance-name" className="mb-2 block text-sm font-medium text-slate-200">
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
                  className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                />
              </div>

              <div>
                <label htmlFor="insurance-email" className="mb-2 block text-sm font-medium text-slate-200">
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
                  className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                />
              </div>

              <div>
                <label htmlFor="insurance-phone" className="mb-2 block text-sm font-medium text-slate-200">
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
                  className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                />
              </div>

              <div>
                <label htmlFor="insurance-destination" className="mb-2 block text-sm font-medium text-slate-200">
                  Destination *
                </label>
                <input
                  id="insurance-destination"
                  name="destination"
                  value={form.destination}
                  onChange={updateField}
                  required
                  placeholder="e.g. United Kingdom"
                  className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                />
              </div>

              <div>
                <label htmlFor="insurance-departure" className="mb-2 block text-sm font-medium text-slate-200">
                  Departure Date
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-300" size={18} />
                  <input
                    id="insurance-departure"
                    type="date"
                    name="departureDate"
                    value={form.departureDate}
                    onChange={updateField}
                    className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 pl-11 text-white outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="insurance-return" className="mb-2 block text-sm font-medium text-slate-200">
                  Return Date
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-300" size={18} />
                  <input
                    id="insurance-return"
                    type="date"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={updateField}
                    min={form.departureDate || undefined}
                    className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 pl-11 text-white outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="insurance-travelers" className="mb-2 block text-sm font-medium text-slate-200">
                  Number of Travelers *
                </label>
                <div className="relative">
                  <Users className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-300" size={18} />
                  <select
                    id="insurance-travelers"
                    name="travelers"
                    value={form.travelers}
                    onChange={updateField}
                    required
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 pl-11 text-white outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                  >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
                      <option key={number} value={number} className="bg-[#21152f]">
                        {number} {number === 1 ? "traveler" : "travelers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="insurance-coverage" className="mb-2 block text-sm font-medium text-slate-200">
                  Type of Assistance *
                </label>
                <select
                  id="insurance-coverage"
                  name="coverageType"
                  value={form.coverageType}
                  onChange={updateField}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 text-white outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                >
                  <option className="bg-[#21152f]">Comprehensive travel insurance</option>
                  <option className="bg-[#21152f]">Emergency medical coverage</option>
                  <option className="bg-[#21152f]">Single-trip coverage</option>
                  <option className="bg-[#21152f]">Multi-trip coverage</option>
                  <option className="bg-[#21152f]">Not sure — need guidance</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="insurance-requirements" className="mb-2 block text-sm font-medium text-slate-200">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="insurance-requirements"
                  name="additionalRequirements"
                  value={form.additionalRequirements}
                  onChange={updateField}
                  rows={4}
                  placeholder="Tell us about any particular travel insurance requirements..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#100b18] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300 focus:ring-2 focus:ring-violet-300/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-violet-300 px-6 py-4 font-semibold text-[#21152f] transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <ShieldCheck size={20} />
              {isSubmitting ? "Submitting Request..." : "Request Insurance Assistance"}
            </button>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-violet-300/10 bg-violet-300/5 p-4 text-sm leading-6 text-slate-400">
              <CheckCircle2 className="mt-0.5 shrink-0 text-violet-300" size={19} />
              <p>
                Submitting this form requests assistance only. It does not
                purchase a policy or guarantee coverage. Policy availability,
                terms and eligibility are subject to the insurance provider.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#100b18] px-5 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-white">Voyage Travel Mansion</p>
        <p className="mt-2">Your trusted partner for better journeys.</p>
        <a
          href="mailto:561travelsandtours@gmail.com"
          className="mt-3 inline-block text-violet-300 transition hover:text-violet-200"
        >
          561travelsandtours@gmail.com
        </a>
        <p className="mt-5 text-xs">
          © {new Date().getFullYear()} Voyage Travel Mansion. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
