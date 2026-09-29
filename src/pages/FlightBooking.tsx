import { useState } from "react";
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

  const handleFlightSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(flightForm.email)) {
  setFlightEmailError(
    "Please enter a valid Gmail address ending with @gmail.com."
  );
  return;
}

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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            Flight Booking
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Plan Your Next Journey
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Tell us where you are travelling from, where you are going, and
            what you need. Our team will review your request and assist you
            with your travel arrangements.
          </p>
        </div>

        {/* Flight Form */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              Flight Booking Request
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Complete the form below and our team will get back to you.
            </p>
          </div>

          <form
            onSubmit={handleFlightSubmit}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="flight-name"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Full Name
              </label>

              <input
                id="flight-name"
                type="text"
                required
                value={flightForm.fullName}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    fullName: e.target.value,
                  })
                }
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="flight-email"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Email Address
              </label>
    <input
  id="flight-email"
  type="email"
  required
  pattern="^[a-zA-Z0-9._%+\-]+@gmail\.com$"
  title="Please enter a valid Gmail address ending with @gmail.com"
  value={flightForm.email}
  onChange={(e) => {
    const value = e.target.value;

    setFlightForm({
      ...flightForm,
      email: value,
    });

    if (value && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
      setFlightEmailError(
        "Please enter a valid Gmail address ending with @gmail.com."
      );
    } else {
      setFlightEmailError("");
    }
  }}
  placeholder="you@gmail.com"
  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
/>
{flightEmailError && (
  <p className="mt-2 text-sm font-medium text-red-400">
    {flightEmailError}
  </p>
)}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="flight-phone"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Phone / WhatsApp
              </label>

              <input
                id="flight-phone"
                type="tel"
                required
                value={flightForm.phone}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    phone: e.target.value,
                  })
                }
                placeholder="+27..."
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Departure */}
            <div>
              <label
                htmlFor="flight-departure"
                className="mb-2 block text-sm font-semibold text-white"
              >
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
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Destination */}
            <div>
              <label
                htmlFor="flight-destination"
                className="mb-2 block text-sm font-semibold text-white"
              >
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
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Departure Date */}
            <div>
              <label
                htmlFor="flight-departure-date"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Departure Date
              </label>

              <input
                id="flight-departure-date"
                type="date"
                required
                value={flightForm.departureDate}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    departureDate: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Return Date */}
            <div>
              <label
                htmlFor="flight-return-date"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Return Date
              </label>

              <input
                id="flight-return-date"
                type="date"
                value={flightForm.returnDate}
                onChange={(e) =>
                  setFlightForm({
                    ...flightForm,
                    returnDate: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Passengers */}
            <div>
              <label
                htmlFor="flight-passengers"
                className="mb-2 block text-sm font-semibold text-white"
              >
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
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
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
              <label
                htmlFor="flight-trip-type"
                className="mb-2 block text-sm font-semibold text-white"
              >
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
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
                <option value="">Select trip type</option>
                <option value="One Way">One Way</option>
                <option value="Round Trip">Return</option>
              </select>
            </div>

            {/* Additional Requirements */}
            <div className="md:col-span-2">
              <label
                htmlFor="flight-requirements"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Additional Requirements  <span className="text-slate-400">(Optional)</span>
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
                className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-67 rounded-xl bg-cyan-500 px-6 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Submit Flight Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default FlightBooking;