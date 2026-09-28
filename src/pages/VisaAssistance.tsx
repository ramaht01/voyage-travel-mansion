import { useState } from "react";
import { toast } from "react-toastify";

const VisaAssistance = () => {
    const [visaEmailError, setVisaEmailError] = useState("");
  const [visaForm, setVisaForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destinationCountry: "",
    visaType: "",
    purpose: "",
    intendedTravelDate: "",
    additionalInformation: "",
  });

  const handleVisaSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(visaForm.email)) {
  setVisaEmailError(
    "Please enter a valid Gmail address ending with @gmail.com."
  );
  return;
}

    try {
      const response = await fetch(
        "http://localhost:4020/api/visa-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visaForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Visa request submitted:", data);

      toast.success("Visa request submitted successfully!");

      setVisaForm({
        fullName: "",
        email: "",
        phone: "",
        destinationCountry: "",
        visaType: "",
        purpose: "",
        intendedTravelDate: "",
        additionalInformation: "",
      });
    } catch (error) {
      console.error("Visa submission error:", error);

      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            Visa Assistance
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get Support With Your Visa Journey
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Tell us about your destination, visa requirements, and travel
            plans. Our team will review your request and guide you through
            the application process.
          </p>
        </div>

        {/* Visa Form */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              Visa Assistance Request
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Complete the form below and our team will contact you with
              guidance on your visa requirements.
            </p>
          </div>

          <form
            onSubmit={handleVisaSubmit}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="visa-name"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Full Name
              </label>

              <input
                id="visa-name"
                type="text"
                required
                value={visaForm.fullName}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
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
                htmlFor="visa-email"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Gmail Address
              </label>

             <input
  id="visa-email"
  type="email"
  required
  pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
  title="Please enter a valid Gmail address ending with @gmail.com"
  value={visaForm.email}
  onChange={(e) => {
    const value = e.target.value;

    setVisaForm({
      ...visaForm,
      email: value,
    });

    if (
      value &&
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)
    ) {
      setVisaEmailError(
        "Please enter a valid Gmail address ending with @gmail.com."
      );
    } else {
      setVisaEmailError("");
    }
  }}
  placeholder="you@gmail.com"
  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
/>

{visaEmailError && (
  <p className="mt-2 text-sm font-medium text-red-400">
    {visaEmailError}
  </p>
)}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="visa-phone"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Phone / WhatsApp
              </label>

              <input
                id="visa-phone"
                type="tel"
                required
                value={visaForm.phone}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    phone: e.target.value,
                  })
                }
                placeholder="+27..."
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Destination Country */}
            <div>
              <label
                htmlFor="visa-country"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Destination Country
              </label>

              <input
                id="visa-country"
                type="text"
                required
                value={visaForm.destinationCountry}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    destinationCountry: e.target.value,
                  })
                }
                placeholder="e.g. United Kingdom"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Visa Type */}
            <div>
              <label
                htmlFor="visa-type"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Visa Type
              </label>

              <select
                id="visa-type"
                required
                value={visaForm.visaType}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    visaType: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
                <option value="">Select visa type</option>
                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Business Visa">Business Visa</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Work Visa">Work Visa</option>
                <option value="Transit Visa">Transit Visa</option>
                <option value="Family / Visit Visa">
                  Family / Visit Visa
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label
                htmlFor="visa-purpose"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Purpose of Travel
              </label>

              <select
                id="visa-purpose"
                required
                value={visaForm.purpose}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    purpose: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
                <option value="">Select purpose</option>
                <option value="Tourism">Tourism</option>
                <option value="Business">Business</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Family / Visit">Family / Visit</option>
                <option value="Transit">Transit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Intended Travel Date */}
            <div>
              <label
                htmlFor="visa-travel-date"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Intended Travel Date
              </label>

              <input
                id="visa-travel-date"
                type="date"
                required
                value={visaForm.intendedTravelDate}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    intendedTravelDate: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Additional Information */}
            <div className="md:col-span-2">
              <label
                htmlFor="visa-information"
                className="mb-2 block text-sm font-semibold text-white"
              >
                Additional Information
              </label>

              <textarea
                id="visa-information"
                rows={5}
                value={visaForm.additionalInformation}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    additionalInformation: e.target.value,
                  })
                }
                placeholder="Tell us anything else we should know about your visa request..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-78 rounded-xl bg-cyan-500 px-6 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Submit Visa Assistance Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VisaAssistance;