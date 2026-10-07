import Navbar from "./components/Navbar";
import Reveal from "./components/Reveal";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import uncleImage from "./assets/Uncle image.jpeg";
import FlightBooking from "./pages/FlightBooking";
import VisaAssistance from "./pages/VisaAssistance";
import {
  Plane,
  ShieldCheck,
  Globe2,
  Clock3,
  BadgeCheck,
  Headphones,
  BookOpenCheck,
  FileCheck2,
  Luggage,
  BriefcaseBusiness,
  Award,
  Users,
  MapPinned,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

function App() {


  if (window.location.pathname === "/admin") {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      return <AdminLogin />;
    }

    return <AdminDashboard />;
  }

  if (window.location.pathname === "/flight-booking") {
    return <FlightBooking />;
  }

  if (window.location.pathname === "/visa-assistance") {
    return <VisaAssistance />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden bg-slate-950"
      >
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90"
          alt="Beautiful travel destination"
          className="absolute inset-0 h-full w-full object-cover animate-[heroZoom_18s_ease-out_forwards] bg-cover bg-center"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 h-2 bg-gradient-to-t from-white via-white/70 to-transparent" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/55" />

        {/* Left-side dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />

        {/* Top dark gradient for navbar */}
        <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-slate-950/80 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-4">
              <span className="h-1 w-12 rounded-full bg-cyan-400" />

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                Voyage Travel Mansion
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-5xl animate-[heroText_1.2s_ease-out_0.2s_both] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Journey
              <span className="block text-cyan-400">Begins With Us.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white sm:text-xl animate-[heroText_1.2s_ease-out_0.45s_both]">
              Professional travel solutions for flights, visas, tours, business
              travel, student travel and unforgettable journeys around the
              world.
            </p>

            {/* Experience */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/40" />

              <span className="text-sm font-medium text-white">
                8 years of travel experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* START YOUR JOURNEY */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500">
              Start Your Journey
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              What can we help you with?
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              From booking your next flight to getting professional visa
              assistance, we're here to make your travel process easier.
            </p>
          </div>

          {/* Application Cards */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
            {/* Flight Booking Card */}
            <a
              href="#flight-booking"
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm  hover:border-cyan-400 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 "
            >
              {/* Decorative glow */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <Plane size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-gray-600">
                  Flight Booking
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  Let us help you find and arrange the right flight for your
                  destination, schedule and travel needs.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/flight-booking";
                  }} 
                  className="mt-8 flex items-center bg-blue-400 rounded-full p-3 gap-2 font-semibold text-cyan-400 "
                >
                  Start a Request
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </a>

            {/* Visa Assistance Card */}
            <a
              href="#visa"
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-8 text-slate-950 shadow-sm    hover:bg-white  transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-400/30"
            >
              {/* Decorative glow */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <ShieldCheck size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">Visa Assistance</h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Get guidance and assistance with your visa application process
                  and travel documentation requirements.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/visa-assistance";
                  }}
                  className="mt-8 flex items-center bg-blue-300 p-3 rounded-full gap-2 font-semibold text-cyan-500 "
                >
                  Get Assistance
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500">
                Why Choose Us
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Travel with confidence.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                With years of experience in the travel industry, Voyage Travel
                Mansion helps individuals, students, families and businesses
                navigate their travel plans with professional guidance and
                personalized support.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <BadgeCheck size={30} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="font-bold text-slate-950">
                    Years of Experience
                  </p>
                  <p className="text-sm text-slate-500">
                    Helping clients with their travel needs
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400 hover:bg-white hover:shadow-xl  hover:shadow-cyan-500/10   ">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <ShieldCheck size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  Flight Support
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Assistance with flight bookings and travel arrangements
                  tailored to your journey.
                </p>
              </div>

              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all ease-out duration-500 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <BookOpenCheck size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  Visa Assistance
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Professional guidance through visa applications and travel
                  documentation requirements.
                </p>
              </div>

              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all ease-out duration-500 hover:-translate-y-2 shadow-sm hover:border-cyan-400 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <Globe2 size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  Global Travel
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Travel support for journeys across destinations around the
                  world.
                </p>
              </div>

              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 ease-out transition-all shadow-sm duration-500 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <Headphones size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  Personal Support
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  A dedicated approach that keeps your travel plans clear,
                  organized and easier to manage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Reveal>
        <section
          id="services"
          className="bg-slate-950 px-6 py-24 text-white lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            {/* HEADER */}
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                Our Services
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Everything you need for your journey.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                From flights and visas to business and student travel, we
                provide professional travel support designed around your needs.
              </p>
            </div>

            {/* SERVICE CARDS */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Flight Bookings */}
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-400/10 active:translate-y-0">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <Plane size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold">Flight Bookings</h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Get assistance arranging flights for personal, family,
                  business and international travel.
                </p>
              </div>

              {/* Visa Services */}
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all ease-out duration-500 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-white/10 active:translate-y-0">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <Globe2 size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold">Visa Assistance</h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Guidance and application support for different travel and visa
                  requirements.
                </p>
              </div>

              {/* Travel Permits */}
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <BookOpenCheck size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold">Travel Permits</h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Assistance with travel permits and documentation needed for
                  your journey.
                </p>
              </div>

              {/* Travel Insurance */}
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <FileCheck2 size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold">Travel Insurance</h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Explore travel insurance options that can provide additional
                  protection during your trip.
                </p>
              </div>

              {/* Tours & Holidays */}
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <Luggage size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  Tours & Holiday Packages
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Plan memorable holidays and travel experiences tailored to
                  your destination and preferences.
                </p>
              </div>

              {/* Business & Student Travel */}
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                  <BriefcaseBusiness size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  Business & Student Travel
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Travel support for professionals, companies and students
                  planning trips abroad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* HOW IT WORKS */}
      <section className="bg-slate-100 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500">
              How It Works
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Your journey, made simple.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Getting started is easy. Tell us what you need, and our team will
              guide you through the next steps.
            </p>
          </div>

          {/* STEPS */}
          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            {/* STEP 1 */}
            <div className="group relative text-center  group transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-2xl font-bold text-cyan-400 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:shadow-cyan-500/20">
                01
              </div>

              <h3 className="mt-7 text-xl font-bold text-slate-950">
                Tell Us What You Need
              </h3>

              <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-600">
                Submit a flight booking request, visa enquiry or contact our
                team directly with your travel requirements.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="group relative text-center group transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400 text-2xl font-bold text-slate-950 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:shadow-cyan-400/30">
                02
              </div>

              <h3 className="mt-7 text-xl font-bold text-slate-950">
                We Review Your Request
              </h3>

              <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-600">
                Our team reviews your travel details and provides guidance based
                on your destination, dates and requirements.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="group relative text-center  group transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-2xl font-bold text-cyan-400 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:shadow-cyan-500/20">
                03
              </div>

              <h3 className="mt-7 text-xl font-bold text-slate-950">
                Start Your Journey
              </h3>

              <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-600">
                Once the details are confirmed, we help you move forward with
                your travel arrangements and documentation.
              </p>
            </div>
          </div>

          {/* CTA */}
        <div className="mt-16 text-center">
  <a
          onClick={() => {
                    window.location.href = "/flight-booking";
                  }}
    href="#flight-booking"
    className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-2xl"
  >
    Start Your Travel Request
    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </a>
</div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl" />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT SIDE */}

          <div>
            <div className="mb-8 flex items-center gap-6">
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full bg-cyan-400/10 blur-xl" />

                <img
                  src={uncleImage}
                  alt="Amokunmosa Olawale Toheeb, Director of Voyage Travel Mansion"
                  className="relative h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-600">
                  Meet Our Director
                </p>

                <p className="mt-2 text-xl font-extrabold tracking-tight text-slate-950">
                  Amokunmosa Olawale Toheeb
                </p>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Director · Voyage Travel Mansion
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative">
              <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                      Our Experience
                    </p>

                    <p className="mt-2 text-4xl font-extrabold">8 Years</p>
                  </div>

                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                    <Globe2 size={30} strokeWidth={1.8} />
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 hover:scale-110 hover:bg-cyan-600 hover:text-white">
                      <Award size={30} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        Professional Travel Assistance
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Support designed around your travel requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 hover:scale-110 hover:bg-cyan-600 hover:text-white">
                      <Users size={30} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="font-bold">Personalized Service</h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        We take the time to understand your travel plans.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 hover:scale-110 hover:bg-cyan-600 hover:text-white">
                      <MapPinned size={30} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="font-bold">Travel Support</h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Assistance with flights, visas and travel documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS INFORMATION */}
      <section className="bg-slate-950 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* DIRECTOR */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl sm:p-10">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                  Meet Our Director
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Amokunmosa Olawale Toheeb
                </h2>

                <p className="mt-2 font-semibold text-cyan-400">Director</p>

                <div className="mt-8 h-px bg-white/10" />

                <p className="mt-7 leading-8 text-slate-300">
                  Voyage Travel Mansion is led by a team committed to providing
                  professional travel assistance and helping clients navigate
                  their travel plans with clarity and confidence.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-slate-950">
                    8+
                  </div>

                  <p className="text-sm text-slate-300">
                    Years of experience in travel services
                  </p>
                </div>
              </div>
            </div>

            {/* COMPANY DETAILS */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                Company Details
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                A registered travel business.
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                Voyage Mansion Travels (Pty) Ltd operates from Johannesburg,
                Gauteng, South Africa, providing travel assistance for clients
                planning journeys locally and internationally.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-cyan-400/40 hover:bg-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Registered Name
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    VOYAGE MANSION TRAVELS (PTY) LTD
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-cyan-400/40 hover:bg-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Registration Number
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    2026/272466/07
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-cyan-400/40 hover:bg-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Office
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    Office 206, 2nd Floor
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:border-cyan-400/40 hover:bg-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Location
                  </p>

                  <p className="mt-2 font-semibold text-white">
                    Johannesburg, Gauteng
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                <p className="text-sm leading-7 text-slate-300">
                  <span className="font-bold text-cyan-400">
                    Office Address:
                  </span>{" "}
                  1572 Albertina Sisulu Street, Johannesburg, Gauteng, South
                  Africa, 2001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500">
              Contact Us
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Let's plan your next journey.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Have a question about flights, visas, travel permits or your next
              trip? Get in touch with Voyage Travel Mansion and our team will be
              happy to assist.
            </p>
          </div>

          {/* CONTACT GRID */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* CONTACT DETAILS */}
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                Get In Touch
              </p>

              <div className="mt-8 space-y-7">
                {/* PHONE */}
                <a
                  href="tel:+27695877716"
                  className="group flex gap-4  transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                    <Phone size={30} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-400">
                      Phone / WhatsApp
                    </p>

                    <p className="mt-1 font-bold text-white group-hover:text-cyan-400">
                      +27 69 587 7716
                    </p>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:561travelsandtours@gmail.com"
                  className="group flex gap-4   transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                    <Mail size={30} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all font-bold text-white group-hover:text-cyan-400">
                      561travelsandtours@gmail.com
                    </p>
                  </div>
                </a>

                {/* ADDRESS */}
                <div className="flex gap-4 group  transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                    <MapPin size={30} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-400">
                      Office
                    </p>

                    <p className="mt-1 font-bold leading-7 text-white">
                      Office 206, 2nd Floor
                      <br />
                      1572 Albertina Sisulu Street
                      <br />
                      Johannesburg, Gauteng 2001
                      <br />
                      South Africa
                    </p>
                  </div>
                </div>

                {/* HOURS */}
                <div className="flex gap-4 group  transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-slate-900/10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                    <Clock3 size={30} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-400">
                      Office Hours
                    </p>

                    <p className="mt-1 font-bold text-white">Monday – Friday</p>

                    <p className="text-slate-300">9:00 AM – 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WHATSAPP BUTTON */}
              <a
                href="https://wa.me/27695877716"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-400/20"
              >
                Chat With Us on WhatsApp
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* CONTACT MESSAGE CARD */}
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500">
                Visit Our Office
              </p>

              <h3 className="mt-4 text-3xl font-bold text-slate-950">
                We're here to help.
              </h3>

              <p className="mt-5 max-w-xl leading-8 text-slate-600">
                Whether you're planning an international trip, arranging
                business travel, preparing for your studies abroad or simply
                need help with your next flight, our team is available during
                office hours to assist you.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                  Office Address
                </p>

                <p className="mt-3 text-lg font-bold leading-8 text-slate-950">
                  Office 206, 2nd Floor
                  <br />
                  1572 Albertina Sisulu Street
                  <br />
                  Johannesburg, Gauteng 2001
                  <br />
                  South Africa
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <a
                  href="tel:+27695877716"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-white"
                >
                  Call Us
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="mailto:561travelsandtours@gmail.com"
                  className="group inline-flex items-center justify-center gap-2 rounded-full shadow-xl  px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-slate-500"
                >
                  Send an Email
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION CTA */}
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
            <div className="grid lg:grid-cols-2">
              {/* FLIGHT */}
              <a
                href="#flight-booking"
                className="group relative overflow-hidden p-8 transition duration-500 hover:bg-slate-900 sm:p-10 lg:p-12"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                      <Plane size={30} strokeWidth={1.8} />
                    </div>

                    <span className="text-3xl text-cyan-400 transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </div>

                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                    Ready to Fly?
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Request a Flight Booking
                  </h3>

                  <p className="mt-4 max-w-md leading-7 text-slate-400">
                    Tell us where you're going and when you're travelling. We'll
                    help you with your flight arrangements.
                  </p>
                </div>
              </a>

              {/* VISA */}
              <a
                href="#visa"
                className="group relative overflow-hidden border-t border-white/10 p-8 transition duration-500 hover:bg-slate-900 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/10" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white">
                      <ShieldCheck size={30} strokeWidth={1.8} />
                    </div>

                    <span className="text-3xl text-cyan-400 transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </div>

                  <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                    Planning to Travel?
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Request Visa Assistance
                  </h3>

                  <p className="mt-4 max-w-md leading-7 text-slate-400">
                    Tell us about your destination and travel plans and get
                    guidance for your visa application process.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* BRAND */}
            <div className="lg:col-span-1">
              <a href="#home" className="text-2xl font-bold tracking-tight">
                Voyage
                <span className="text-cyan-400"> Travel Mansion</span>
              </a>

              <p className="mt-5 max-w-sm leading-7 text-slate-400">
                Professional travel assistance for flights, visas, tours,
                business travel, student travel and journeys around the world.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/40" />
                <span className="text-sm font-semibold text-slate-300">
                  8 years of travel experience
                </span>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-bold text-white">Quick Links</h3>

              <div className="mt-5 space-y-3">
                <a
                  href="#home"
                  className="block text-sm text-slate-400 transition duration-300 hover:translate-x-1 hover:text-cyan-400"
                >
                  Home
                </a>

                <a
                  href="#about"
                  className="block text-sm text-slate-400 transition duration-300 hover:translate-x-1 hover:text-cyan-400"
                >
                  About Us
                </a>

                <a
                  href="#services"
                  className="block text-sm text-slate-400 transition duration-300 hover:translate-x-1 hover:text-cyan-400"
                >
                  Services
                </a>

                <a
                  href="#contact"
                  className="block text-sm text-slate-400 transition duration-300 hover:translate-x-1 hover:text-cyan-400"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="font-bold text-white">Services</h3>

              <div className="mt-5 space-y-3">
                <a
                  href="#flight-booking"
                  className="block text-sm text-slate-400 transition duration-300 hover:translate-x-1 hover:text-cyan-400"
                >
                  Flight Bookings
                </a>

                <a
                  href="#visa"
                  className="block text-sm text-slate-400 transition duration-300 hover:translate-x-1 hover:text-cyan-400"
                >
                  Visa Assistance
                </a>

                <span className="block text-sm text-slate-400">
                  Travel Permits
                </span>

                <span className="block text-sm text-slate-400">
                  Travel Insurance
                </span>

                <span className="block text-sm text-slate-400">
                  Tours & Holiday Packages
                </span>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-bold text-white">Contact</h3>

              <div className="mt-5 space-y-4">
                <a
                  href="tel:+27695877716"
                  className="block text-sm leading-6 text-slate-400 transition duration-300 hover:text-cyan-400"
                >
                  +27 69 587 7716
                </a>

                <a
                  href="mailto:561travelsandtours@gmail.com"
                  className="block break-all text-sm leading-6 text-slate-400 transition duration-300 hover:text-cyan-400"
                >
                  561travelsandtours@gmail.com
                </a>

                <p className="text-sm leading-6 text-slate-400">
                  Office 206, 2nd Floor
                  <br />
                  1572 Albertina Sisulu Street
                  <br />
                  Johannesburg, Gauteng 2001
                  <br />
                  South Africa
                </p>

                <a
                  href="https://wa.me/27695877716"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20"
                >
                  WhatsApp Us
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-14 border-t border-white/10 pt-7">
            <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} Voyage Travel Mansion. All rights
                reserved.
              </p>

              <p>VOYAGE MANSION TRAVELS (PTY) LTD · Reg. No. 2026/272466/07</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
