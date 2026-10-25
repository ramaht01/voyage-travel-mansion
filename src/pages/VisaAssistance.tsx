
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import SecurityVerification from "../components/SecurityVerification";
import { getTodayDate } from "../utils/dateHelpers";
import PageSEO from "../components/PageSEO";

const VisaAssistance = () => {
  const [visaEmailError, setVisaEmailError] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [numberOfApplicants, setNumberOfApplicants] = useState("1");
  const [visaForm, setVisaForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    countryOfResidence: "",
    destinationCountry: "",
    visaType: "",
    purpose: "",
    intendedTravelDate: "",
    intendedStayDuration: "",
    applicationStatus: "",
    previousRefusal: "",
    additionalInformation: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
const turnstileToken = turnstileRef.current?.getResponse();

if (!turnstileToken) {
  toast.error("Please complete the security verification.");
  return;
}


    if (
      !visaForm.fullName.trim() ||
      !visaForm.email.trim() ||
      !visaForm.phone.trim() ||
      !visaForm.nationality.trim() ||
      !visaForm.countryOfResidence.trim() ||
      !visaForm.destinationCountry.trim() ||
      !visaForm.visaType ||
      !visaForm.purpose ||
      !visaForm.intendedTravelDate ||
      !visaForm.applicationStatus ||
      !visaForm.previousRefusal
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(visaForm.email)) {
      setVisaEmailError(
        "Please enter a valid Gmail address ending with @gmail.com."
      );
      return;
    }

    setVisaEmailError("");

    const visaDetails = [
      `Applicant nationality: ${visaForm.nationality}`,
      `Country of residence: ${visaForm.countryOfResidence}`,
      `Intended length of stay: ${
        visaForm.intendedStayDuration || "Not specified"
      }`,
      `Application progress: ${visaForm.applicationStatus}`,
      `Previous visa refusal: ${visaForm.previousRefusal}`,
      visaForm.additionalInformation.trim()
        ? `Additional information: ${visaForm.additionalInformation.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/visa-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: visaForm.fullName,
            email: visaForm.email,
            phone: visaForm.phone,
            destinationCountry: visaForm.destinationCountry,
            visaType: visaForm.visaType,
            purpose: visaForm.purpose,
            intendedTravelDate: visaForm.intendedTravelDate,
            additionalInformation: visaDetails,
            turnstileToken,
            numberOfApplicants: Number(numberOfApplicants),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit visa assistance request."
        );
      }

      toast.success("Visa request submitted successfully!");

      setVisaForm({
        fullName: "",
        email: "",
        phone: "",
        nationality: "",
        countryOfResidence: "",
        destinationCountry: "",
        visaType: "",
        purpose: "",
        intendedTravelDate: "",
        intendedStayDuration: "",
        applicationStatus: "",
        previousRefusal: "",
        additionalInformation: "",
      });
    } catch (error) {
      console.error("Visa submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }

finally {
  turnstileRef.current?.reset();
}

  };

  const inputClass =
    "w-full rounded-xl border border-cyan-300/15 bg-[#101c2e] px-4 py-3.5 text-white placeholder:text-slate-400 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-100";

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

       
<PageSEO
  title="Visa Application Assistance in Johannesburg | Voyage Travel Mansion"
  description="Get professional visa application assistance, visa consultation and travel document guidance from Voyage Travel Mansion in Johannesburg, South Africa."
/>


        {/* Hero Section */}
        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-[#142b43] via-[#0d1c30] to-[#07111f] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
              Visa Assistance
            </p>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your visa journey,
              <span className="block text-cyan-400">
                guided with care.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Whether you're planning a holiday, studying abroad, visiting
              family, or travelling for business, tell us about your visa
              needs so our team can guide you through the next steps.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2">
                Personal guidance
              </span>
              <span className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2">
                Multiple visa types
              </span>
              <span className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2">
                Application support
              </span>
            </div>
          </div>
        </section>

        {/* Visa Request Form */}
        <section className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#0d1a2b] shadow-2xl shadow-black/20">
          <div className="border-b border-cyan-300/15 px-6 py-7 sm:px-8 lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Your application starts here
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Let's Understand Your Visa Needs
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Answer a few questions about your circumstances and travel
              plans so our team can understand what assistance you need.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-x-6 gap-y-6 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-10"
          >
            {/* Section 1: Applicant Details */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                01. Applicant Details
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Tell us who is applying and how we can contact you.
              </p>
            </div>

            <div>
              <label htmlFor="visa-name" className={labelClass}>
                Full Name *
              </label>
              <input
                id="visa-name"
                type="text"
                autoComplete="name"
                required
                value={visaForm.fullName}
                onChange={(e) =>
                  setVisaForm({ ...visaForm, fullName: e.target.value })
                }
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="visa-email" className={labelClass}>
                Gmail Address *
              </label>
              <input
                id="visa-email"
                type="email"
                autoComplete="email"
                required
                pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                title="Please enter a valid Gmail address ending with @gmail.com"
                value={visaForm.email}
                onChange={(e) => {
                  const value = e.target.value;

                  setVisaForm({ ...visaForm, email: value });

                  setVisaEmailError(
                    value &&
                      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value)
                      ? "Please enter a valid Gmail address ending with @gmail.com."
                      : ""
                  );
                }}
                placeholder="you@gmail.com"
                aria-invalid={Boolean(visaEmailError)}
                aria-describedby={
                  visaEmailError ? "visa-email-error" : undefined
                }
                className={`${inputClass} ${
                  visaEmailError
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : ""
                }`}
              />

              {visaEmailError && (
                <p
                  id="visa-email-error"
                  className="mt-2 text-sm font-medium text-red-400"
                >
                  {visaEmailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="visa-phone" className={labelClass}>
                Phone / WhatsApp *
              </label>
              <input
                id="visa-phone"
                type="tel"
                autoComplete="tel"
                required
                value={visaForm.phone}
                onChange={(e) =>
                  setVisaForm({ ...visaForm, phone: e.target.value })
                }
                placeholder="Include your country code"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="visa-nationality" className={labelClass}>
                Nationality *
              </label>
              <input
                id="visa-nationality"
                type="text"
                required
                value={visaForm.nationality}
                onChange={(e) =>
                  setVisaForm({ ...visaForm, nationality: e.target.value })
                }
                placeholder="e.g. Nigerian"
                className={inputClass}
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="visa-residence" className={labelClass}>
                Country of Current Residence *
              </label>
              <input
                id="visa-residence"
                type="text"
                required
                value={visaForm.countryOfResidence}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    countryOfResidence: e.target.value,
                  })
                }
                placeholder="Which country do you currently live in?"
                className={inputClass}
              />
            </div>

            {/* Section 2: Visa Requirements */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                02. Destination & Visa Requirements
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Help us understand where you're going and why.
              </p>
            </div>

            <div>
              <label htmlFor="visa-country" className={labelClass}>
                Destination Country *
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
                className={inputClass}
              />
            </div>

            
{/* Number of Visa Applicants */}
<div>
  <label
    htmlFor="visa-applicants"
    className="mb-2 block text-sm font-semibold text-white"
  >
    Number of Applicants *
  </label>

  <select
    id="visa-applicants"
    value={numberOfApplicants}
    onChange={(e) => setNumberOfApplicants(e.target.value)}
    required
    className="w-full rounded-xl border border-white/10 bg-[#101c2e] px-4 py-3.5 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
  >
    {Array.from({ length: 50 }, (_, index) => index + 1).map(
      (number) => (
        <option key={number} value={number}>
          {number} {number === 1 ? "applicant" : "applicants"}
        </option>
      )
    )}
  </select>
</div>


            <div>
              <label htmlFor="visa-type" className={labelClass}>
                Type of Visa Required *
              </label>
              <select
                id="visa-type"
                required
                value={visaForm.visaType}
                onChange={(e) =>
                  setVisaForm({ ...visaForm, visaType: e.target.value })
                }
                className={inputClass}
              >
                <option value="">Select visa type</option>
                <option value="Tourist Visa">Tourist Visa</option>
                <option value="Business Visa">Business Visa</option>
                <option value="Student Visa">Student Visa</option>
                <option value="Work Visa">Work Visa</option>
                <option value="Transit Visa">Transit Visa</option>
                <option value="Family / Visit Visa">Family / Visit Visa</option>
                <option value="Other">Other / Not Sure Yet</option>
              </select>
            </div>

            <div>
              <label htmlFor="visa-purpose" className={labelClass}>
                Main Purpose of Travel *
              </label>
              <select
                id="visa-purpose"
                required
                value={visaForm.purpose}
                onChange={(e) =>
                  setVisaForm({ ...visaForm, purpose: e.target.value })
                }
                className={inputClass}
              >
                <option value="">Select purpose</option>
                <option value="Tourism">Tourism / Holiday</option>
                <option value="Business">Business</option>
                <option value="Study">Study / Education</option>
                <option value="Work">Employment</option>
                <option value="Family / Visit">Family / Visit</option>
                <option value="Transit">Transit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="visa-duration" className={labelClass}>
                Expected Length of Stay
              </label>
              <select
                id="visa-duration"
                value={visaForm.intendedStayDuration}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    intendedStayDuration: e.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Select duration</option>
                <option value="Less than 2 weeks">Less than 2 weeks</option>
                <option value="2 weeks to 1 month">2 weeks to 1 month</option>
                <option value="1 to 3 months">1 to 3 months</option>
                <option value="3 to 6 months">3 to 6 months</option>
                <option value="More than 6 months">More than 6 months</option>
                <option value="Not sure">Not sure yet</option>
              </select>
            </div>

            {/* Section 3: Application Progress */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                03. Your Application Progress
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                This helps us understand the stage you're at.
              </p>
            </div>

            <div>
              <label htmlFor="visa-status" className={labelClass}>
                Where Are You in the Process? *
              </label>
              <select
                id="visa-status"
                required
                value={visaForm.applicationStatus}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    applicationStatus: e.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Select application stage</option>
                <option value="Just getting started">
                  Just getting started
                </option>
                <option value="Need help preparing documents">
                  Need help preparing documents
                </option>
                <option value="Ready to apply">Ready to apply</option>
                <option value="Application already submitted">
                  Application already submitted
                </option>
                <option value="Need help with a refused application">
                  Previous application refused
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="visa-refusal" className={labelClass}>
                Has a Visa Application Been Refused Before? *
              </label>
              <select
                id="visa-refusal"
                required
                value={visaForm.previousRefusal}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    previousRefusal: e.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Prefer to discuss privately">
                  Prefer to discuss privately
                </option>
              </select>
            </div>

            {/* Section 4: Travel Date */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                04. Intended Travel Date
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                When are you hoping to travel? This helps us understand
                your intended timeline.
              </p>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="visa-travel-date" className={labelClass}>
                Intended Travel Date *
              </label>
              <input
                id="visa-travel-date"
                type="date"
                required
               min={getTodayDate()}
                value={visaForm.intendedTravelDate}
                onChange={(e) =>
                  setVisaForm({
                    ...visaForm,
                    intendedTravelDate: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            {/* Section 5: Additional Information */}
            <div className="mt-3 lg:col-span-2">
              <h3 className="text-lg font-bold text-white">
                05. Additional Information
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Share any questions or relevant details you'd like
                our team to know.
              </p>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="visa-information" className={labelClass}>
                Tell Us More
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
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
                placeholder="Mention any questions, special circumstances, or assistance you need. Please don't enter passport numbers or other sensitive document details here."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Submit */}
            <div className="pt-2 lg:col-span-2">
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#0d1a2b] sm:w-auto sm:min-w-64"
              >
                Submit Visa Assistance Request
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <p className="mt-4 text-xs leading-6 text-slate-400">
                Our team will review your enquiry and guide you on the
                next steps. Submitting this form does not guarantee visa
                approval or replace official immigration advice.
              </p>
            </div>


<div className="md:col-span-2">
  <SecurityVerification turnstileRef={turnstileRef} />
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

export default VisaAssistance;
