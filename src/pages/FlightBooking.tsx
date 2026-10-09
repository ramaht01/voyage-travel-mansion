
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

const FlightBooking = () => {
  const [flightEmailError, setFlightEmailError] = useState("");

  const [flightForm, setFlightForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: "",
    tripType: "",
    additionalRequirements: "",
  });

  const handleFlightSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(flightForm.email)) {
      setFlightEmailError(
        "Please enter a valid Gmail address ending with @gmail.com."
      );
      return;
    }

    setFlightEmailError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/flight-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...flightForm,
            passengers: Number(flightForm.passengers),
            tripType:
              flightForm.tripType.toLowerCase() === "one way"
                ? "One Way"
                : "Round Trip",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Flight request submitted:", data);

      toast.success("Flight request submitted successfully!");

      setFlightForm({
        fullName: "",
        email: "",
        phone: "",
        departure: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        passengers: "",
        tripType: "",
        additionalRequirements: "",
      });
    } catch (error) {
      console.error("Flight submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-violet-200/10 bg-[#1c1428] px-4 py-3.5 text-white placeholder:text-violet-200/40 outline-none transition duration-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20";

  const labelClass =
    "mb-2 block text-sm font-semibold text-violet-50";

  return (
    <main className="min-h-screen bg-[#100b18] px-4 py-6 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">

        {/* Top Navigation */}
        <header className="mb-12 flex items-center justify-between gap-4">
          <a
            href="/"
            className="text-lg font-extrabold tracking-tight text-white sm:text-xl"
          >
            Voyage <span className="text-violet-400">Travel Mansion</span>
          </a>

          <a
            href="/"
            className="rounded-full border border-violet-200/15 px-4 py-2.5 text-sm font-semibold text-violet-100 transition hover:border-violet-400/60 hover:bg-violet-400/10"
          >
            ← Back to Home
          </a>
        </header>

        {/* Hero Section */}
        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-violet-300/10 bg-gradient-to-br from-[#211331] via-[#181022] to-[#100b18] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-violet-300 sm:text-sm">
              Flight Booking
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your next journey
              <span className="block text-violet-400">
                starts here.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-violet-100/70 sm:text-base sm:leading-8">
              Tell us where you are travelling from and where you would
              love to go. Our team will review your request and help you
              plan your flight with greater peace of mind.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-violet-100/80">
              <span className="rounded-full border border-violet-200/10 bg-white/5 px-4 py-2">
                Personal assistance
              </span>
              <span className="rounded-full border border-violet-200/10 bg-white/5 px-4 py-2">
                One-way & return flights
              </span>
              <span className="rounded-full border border-violet-200/10 bg-white/5 px-4 py-2">
                International travel
              </span>
            </div>
          </div>
        </section>

        {/* Flight Request Form */}
        <section className="overflow-hidden rounded-[2rem] border border-violet-200/10 bg-[#181120] shadow-2xl shadow-black/20">
          <div className="border-b border-violet-200/10 px-6 py-7 sm:px-8 lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              Let's plan your trip
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Flight Booking Request
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-violet-100/60">
              Complete the details below. Our team will review your
              request and get back to you.
            </p>
          </div>

          <form
            onSubmit={handleFlightSubmit}
            className="grid gap-x-6 gap-y-6 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-10"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="flight-name" className={labelClass}>
                Full Name
              </label>
              <input
                id="flight-name"
                type="text"
                autoComplete="name"
                required
                value={flightForm.fullName}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    fullName: e.target.value,
                  })
                }
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="flight-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="flight-email"
                type="email"
                autoComplete="email"
                required
                pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                title="Please enter a valid Gmail address ending with @gmail.com"
                value={flightForm.email}
                onChange={(e) => {
                  const value = e.target.value;

                  setFlightForm({
                    ...flightForm,
                    email: value,
                  });

                  if (
                    value &&
                    !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value)
                  ) {
                    setFlightEmailError(
                      "Please enter a valid Gmail address ending with @gmail.com."
                    );
                  } else {
                    setFlightEmailError("");
                  }
                }}
                placeholder="you@gmail.com"
                aria-invalid={Boolean(flightEmailError)}
                aria-describedby={
                  flightEmailError ? "flight-email-error" : undefined
                }
                className={`${inputClass} ${
                  flightEmailError
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : ""
                }`}
              />
              {flightEmailError && (
                <p
                  id="flight-email-error"
                  className="mt-2 text-sm font-medium text-red-400"
                >
                  {flightEmailError}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="flight-phone" className={labelClass}>
                Phone / WhatsApp
              </label>
              <input
                id="flight-phone"
                type="tel"
                autoComplete="tel"
                required
                value={flightForm.phone}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    phone: e.target.value,
                  })
                }
                placeholder="+27..."
                className={inputClass}
              />
            </div>

            {/* Departure */}
            <div>
              <label htmlFor="flight-departure" className={labelClass}>
                Departure Location
              </label>
              <input
                id="flight-departure"
                type="text"
                required
                value={flightForm.departure}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    departure: e.target.value,
                  })
                }
                placeholder="e.g. Johannesburg"
                className={inputClass}
              />
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="flight-destination" className={labelClass}>
                Destination
              </label>
              <input
                id="flight-destination"
                type="text"
                required
                value={flightForm.destination}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    destination: e.target.value,
                  })
                }
                placeholder="e.g. London"
                className={inputClass}
              />
            </div>

            {/* Departure Date */}
            <div>
              <label htmlFor="flight-departure-date" className={labelClass}>
                Departure Date
              </label>
              <input
                id="flight-departure-date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={flightForm.departureDate}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    departureDate: e.target.value,
                    returnDate:
                      flightForm.returnDate &&
                      flightForm.returnDate < e.target.value
                        ? ""
                        : flightForm.returnDate,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Return Date */}
            <div>
              <label htmlFor="flight-return-date" className={labelClass}>
                Return Date
                <span className="ml-2 font-normal text-violet-200/50">
                  (Optional)
                </span>
              </label>
              <input
                id="flight-return-date"
                type="date"
                min={
                  flightForm.departureDate ||
                  new Date().toISOString().split("T")[0]
                }
                value={flightForm.returnDate}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    returnDate: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Passengers */}
            <div>
              <label htmlFor="flight-passengers" className={labelClass}>
                Passengers
              </label>
              <select
                id="flight-passengers"
                required
                value={flightForm.passengers}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    passengers: e.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Select passengers</option>
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5+ Passengers</option>
              </select>
            </div>

            {/* Trip Type */}
            <div>
              <label htmlFor="flight-trip-type" className={labelClass}>
                Trip Type
              </label>
              <select
                id="flight-trip-type"
                required
                value={flightForm.tripType}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    tripType: e.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Select trip type</option>
                <option value="One Way">One Way</option>
                <option value="Round Trip">Return / Round Trip</option>
              </select>
            </div>

            {/* Additional Requirements */}
            <div className="lg:col-span-2">
              <label htmlFor="flight-requirements" className={labelClass}>
                Additional Requirements
                <span className="ml-2 font-normal text-violet-200/50">
                  (Optional)
                </span>
              </label>
              <textarea
                id="flight-requirements"
                rows={5}
                value={flightForm.additionalRequirements}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    additionalRequirements: e.target.value,
                  })
                }
                placeholder="Tell us anything else we should know about your trip..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit */}
            <div className="pt-2 lg:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-violet-400 hover:to-fuchsia-400 hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-[#181120] sm:w-auto sm:min-w-64"
              >
                Submit Flight Request
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </button>

              <p className="mt-4 text-xs leading-6 text-violet-100/50">
                Your request will be sent to our team for review. Submitting
                this form does not confirm a flight booking.
              </p>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-violet-100/40">
          Voyage Travel Mansion · Your trusted partner for better journeys.
        </footer>
      </div>
    </main>
  );
};

export default FlightBooking;