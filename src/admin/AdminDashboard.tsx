import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminDashboard() {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
  window.location.href = "/admin";
  return null;
}

 const adminFetch = async (
  url: string,
  options: RequestInit = {},
) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${adminToken}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }

  return response;
};

  const [flightCount, setFlightCount] = useState(0);
  const [visaCount, setVisaCount] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [recentFlights, setRecentFlights] = useState<any[]>([]);
  const [recentVisas, setRecentVisas] = useState<any[]>([]);
const [selectedFlight, setSelectedFlight] = useState<any | null>(null);
const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
    const [selectedVisa, setSelectedVisa] = useState<any | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteFlightConfirm, setDeleteFlightConfirm] = useState(false);
const [deleteVisaConfirm, setDeleteVisaConfirm] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [lastUpdated, setLastUpdated] = useState("");
const [isRefreshing, setIsRefreshing] = useState(false);
const filteredFlights = recentFlights.filter((request) => {
  const search = searchTerm.trim().toLowerCase();

  if (!search) {
    return true;
  }

  return (
    String(request.fullName || "").toLowerCase().includes(search) ||
    String(request.email || "").toLowerCase().includes(search) ||
    String(request.departure || "").toLowerCase().includes(search) ||
    String(request.destination || "").toLowerCase().includes(search) ||
    String(request.status || "").toLowerCase().includes(search)
  );
});

const filteredVisas = recentVisas.filter((request) => {
  const search = searchTerm.trim().toLowerCase();

  if (!search) {
    return true;
  }

  return (
    String(request.fullName || "").toLowerCase().includes(search) ||
    String(request.email || "").toLowerCase().includes(search) ||
    String(request.destinationCountry || "").toLowerCase().includes(search) ||
    String(request.visaType || "").toLowerCase().includes(search) ||
    String(request.status || "").toLowerCase().includes(search)
  );
});


useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return;
  }

  const fetchRequests = async () => {
    try {
      const [flightResponse, visaResponse] = await Promise.all([
        fetch("http://localhost:4020/api/flight-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("http://localhost:4020/api/visa-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const flightData = await flightResponse.json();
      const visaData = await visaResponse.json();

      if (!flightResponse.ok) {
        throw new Error(
          flightData.message || "Unable to fetch flight requests",
        );
      }

      if (!visaResponse.ok) {
        throw new Error(
          visaData.message || "Unable to fetch visa requests",
        );
      }

      const flights = flightData.requests || [];
      const visas = visaData.requests || [];

      setRecentFlights(flights);
      setRecentVisas(visas);

      setFlightCount(flights.length);
      setVisaCount(visas.length);

      setNewCount(
        [...flights, ...visas].filter(
          (request) => request.status === "New",
        ).length,
      );

      setCompletedCount(
        [...flights, ...visas].filter(
          (request) => request.status === "Completed",
        ).length,
      );

      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setIsLoading(false);
    }
  };

  fetchRequests();
}, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 md:block">
        <div className="border-b border-white/10 px-6 py-6">
          <h1 className="text-xl font-bold tracking-tight">Voyage Travel</h1>

          <p className="mt-2 text-xs text-slate-500">
  Secure administration portal
</p>

<div className="flex flex-col gap-5 px-6 pt-8 sm:flex-row sm:items-start sm:justify-between lg:px-8">
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-white">
      Admin Dashboard
    </h1>

    <p className="mt-2 text-sm text-slate-400">
      Manage flight and visa requests for Voyage Travel Mansion.
    </p>

<div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
  <span className="text-xs font-semibold text-emerald-300">
    Admin portal active
  </span>
</div>

{lastUpdated && (
  <p className="mt-3 text-xs text-slate-500">
    Last updated at {lastUpdated}
  </p>
)}

  </div>

 
</div>

        </div>

        <nav className="space-y-2 px-4 py-6">
          <button className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-left font-semibold text-slate-950">
            Dashboard
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-white/5 hover:text-white">
            Flight Requests
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-white/5 hover:text-white">
            Visa Requests
          </button>

          <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-white/5 hover:text-white">
            Clients
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen md:ml-64">

        {isLoading && (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950">
    <div className="text-center">
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
    Voyage Travel Mansion
  </p>

  <div className="mx-auto mt-5 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />

  <p className="mt-4 text-sm font-medium text-slate-400">
    Loading dashboard...
  </p>
</div>

  </div>
)}

 <button
    type="button"
    onClick={() => {
      toast.success("Logged out successfully!");

      localStorage.removeItem("adminToken");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }}
    className="w-full rounded-xl border mt-7 lg:ml-8 border-red-400/20 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300 sm:w-auto"
  >
    Logout
  </button>

        <header className="border-b border-white/10 bg-slate-950/80 px-6 py-6 backdrop-blur-xl lg:px-8">

        <div className="mt-6 max-w-xl">
  <label
    htmlFor="request-search"
    className="mb-2 block text-sm font-medium text-slate-300"
  >
    Search Requests
  </label>

  <input
    id="request-search"
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by client name, email, destination..."
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:bg-white/10"
  />
</div>

          <p className="text-sm font-medium text-cyan-400">Welcome back</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight">Dashboard</h2>

          <p className="mt-2 text-slate-400">
            Manage flight and visa requests from one place.
          </p>
        </header>

        <section className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          {/* Flight Requests */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Flight Requests</p>

            <p className="mt-3 text-3xl font-bold">{flightCount}</p>
          </div>

          {/* Visa Requests */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Visa Requests</p>

            <p className="mt-3 text-3xl font-bold">{visaCount}</p>
          </div>

          {/* New Requests */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">New Requests</p>

            <p className="mt-3 text-3xl font-bold">{newCount}</p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Completed</p>

            <p className="mt-3 text-3xl font-bold">{completedCount}</p>
          </div>
        </section>

        <section className="grid gap-6 p-6 lg:grid-cols-2 lg:p-8">
          {/* Recent Flight Requests */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-6">
              <p className="text-sm font-medium text-cyan-400">Recent</p>

              <h3 className="mt-1 text-xl font-bold">Flight Requests</h3>
            </div>

            <div className="space-y-3">
           {filteredFlights.length === 0 ? (
  <p className="py-4 text-sm text-slate-400">
    No matching flight requests found.
  </p>
) : (
  filteredFlights.map((request) => (
    <button
      key={request._id}
      type="button"
onClick={() => {
  setSelectedFlight(request);
  setSelectedFlightId(request._id);
}}
      className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">
            {request.fullName}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {request.departure} → {request.destination}
          </p>
        </div>

        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {request.status}
        </span>
      </div>
    </button>
  ))
)}
            </div>
          </div>

          {/* Recent Visa Requests */}
         <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
  <div className="mb-6">
    <p className="text-sm font-medium text-cyan-400">
      Recent
    </p>

    <h3 className="mt-1 text-xl font-bold">
      Visa Requests
    </h3>
  </div>

  <div className="space-y-3">
      {filteredVisas.length === 0 ? (
  <p className="py-4 text-sm text-slate-400">
    No matching visa requests found.
  </p>
) : (
  filteredVisas.map((request) => (
    <button
      key={request._id}
      type="button"
      onClick={() => setSelectedVisa(request)}
      className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">
            {request.fullName}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            {request.destinationCountry} · {request.visaType}
          </p>
        </div>

        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {request.status}
        </span>
      </div>
    </button>
  ))
)}
  </div>
</div>
        </section>

              {selectedFlight && (
          <section className="px-6 pb-8 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              
            <div className="flex items-start justify-between gap-4">
  <div>
    <p className="text-sm font-medium text-cyan-400">
      Flight Request
    </p>

    <h3 className="mt-1 text-2xl font-bold">
      {selectedFlight.fullName}
    </h3>
  </div>

  <div className="flex items-center gap-3">
  
<button
  type="button"
  onClick={() => {
    setDeleteFlightConfirm(true);
  }}
  className="rounded-full border border-red-400/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300"
>
  Delete
</button>

    <button
      type="button"
      onClick={() => {
  setSelectedFlight(null);
  setSelectedFlightId(null);
}}
        className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      Close
    </button>
  </div>
</div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Phone / WhatsApp
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Route</p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.departure} →{" "}
                    {selectedFlight.destination}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Departure Date
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.departureDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Return Date
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.returnDate || "One way"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Passengers
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.passengers}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Trip Type
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedFlight.tripType}
                  </p>
                </div>

              <div>
  <p className="text-xs text-slate-500">
    Status
  </p>

  <select
    value={selectedFlight.status}
   onChange={async (e) => {
  const newStatus = e.target.value;

  try {
    const response = await adminFetch(
      `http://localhost:4020/api/flight-requests/${selectedFlight._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update status");
    }

    setSelectedFlight(data.request);

setRecentFlights((currentFlights) =>
  currentFlights.map((request) =>
    request._id === data.request._id
      ? data.request
      : request
  )
);

setNewCount((currentCount) => {
  const wasNew = selectedFlight.status === "New";
  const isNowNew = data.request.status === "New";

  if (wasNew && !isNowNew) {
    return Math.max(0, currentCount - 1);
  }

  if (!wasNew && isNowNew) {
    return currentCount + 1;
  }

  return currentCount;
});

setCompletedCount((currentCount) => {
  const wasCompleted = selectedFlight.status === "Completed";
  const isNowCompleted = data.request.status === "Completed";

  if (!wasCompleted && isNowCompleted) {
    return currentCount + 1;
  }

  if (wasCompleted && !isNowCompleted) {
    return Math.max(0, currentCount - 1);
  }

  return currentCount;
});

toast.success("Flight request updated successfully!");

  } catch (error) {
    console.error("Flight status update error:", error);

    toast.error("Unable to update flight request.");
  }
}}
    className="mt-2 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/50"
  >
    <option value="New">New</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div> 

              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-500">
                  Additional Requirements
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedFlight.additionalRequirements ||
                    "No additional requirements provided."}
                </p>
              </div>

           <div className="mt-6">
  <p className="text-xs text-slate-500">
    Internal Notes
  </p>

  <textarea
    value={selectedFlight.notes || ""}
    onChange={(e) =>
      setSelectedFlight({
        ...selectedFlight,
        notes: e.target.value,
      })
    }
    placeholder="Add an internal note about this request..."
    rows={4}
    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50"
  />

  <button
    type="button"
    onClick={async () => {
      try {
        const response = await adminFetch(
          `http://localhost:4020/api/flight-requests/${selectedFlight._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: selectedFlight.status,
              notes: selectedFlight.notes || "",
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to save notes"
          );
        }

        setSelectedFlight(data.request);

        setRecentFlights((currentFlights) =>
          currentFlights.map((request) =>
            request._id === data.request._id
              ? data.request
              : request
          )
        );

       toast.success("Internal notes saved successfully!");
      } catch (error) {
        console.error("Flight notes update error:", error);
     toast.error("Unable to save internal notes.");
      }
    }}
    className="mt-3 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
  >
    Save Notes
  </button>
</div>

            </div>
          </section>

        )}

       {deleteFlightConfirm && selectedFlight && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
      
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-red-400">
          <span className="text-xl">!</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">
            Delete Flight Request?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Are you sure you want to delete the flight request from{" "}
            <span className="font-semibold text-white">
              {selectedFlight.fullName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
<button
  type="button"
  onClick={() => {
  setDeleteFlightConfirm(false);
}}
  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
>
  Close
</button>

        <button
          type="button"
          onClick={async () => {
            try {
              const response = await adminFetch(
                `http://localhost:4020/api/flight-requests/${selectedFlight._id}`,
                {
                  method: "DELETE",
                }
              );

              const data = await response.json();

              if (!response.ok) {
                throw new Error(
                  data.message || "Failed to delete flight request"
                );
              }

              setRecentFlights((currentFlights) =>
                currentFlights.filter(
                  (request) => request._id !== selectedFlight._id
                )
              );

              setFlightCount((currentCount) =>
                Math.max(0, currentCount - 1)
              );

              if (selectedFlight.status === "New") {
                setNewCount((currentCount) =>
                  Math.max(0, currentCount - 1)
                );
              }

              if (selectedFlight.status === "Completed") {
                setCompletedCount((currentCount) =>
                  Math.max(0, currentCount - 1)
                );
              }

              setDeleteFlightConfirm(false);
              setSelectedFlight(null);

              toast.success("Flight request deleted successfully!");
            } catch (error) {
              console.error("Flight delete error:", error);

              toast.error("Unable to delete flight request.");
            }
          }}
          className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Delete Request
        </button>
      </div>
    </div>
  </div>
)} 

                   {selectedVisa && (
          <section className="px-6 pb-8 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <div className="flex items-start justify-between gap-4">
  <div>
    <p className="text-sm font-medium text-cyan-400">
      Visa Request
    </p>

    <h3 className="mt-1 text-2xl font-bold">
      {selectedVisa.fullName}
    </h3>
  </div>

  <div className="flex items-center gap-3">
   <button
  type="button"
  onClick={() => {
    setDeleteVisaConfirm(true);
  }}
  className="rounded-full border border-red-400/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300"
>
  Delete
</button>

<button
  type="button"
  onClick={() => setSelectedVisa(null)}
  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
>
  Close
</button>
  </div>
</div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div>
                  <p className="text-xs text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedVisa.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Phone / WhatsApp
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedVisa.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Destination Country
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedVisa.destinationCountry}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Visa Type
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedVisa.visaType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Purpose of Travel
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedVisa.purpose}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Intended Travel Date
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {selectedVisa.intendedTravelDate}
                  </p>
                </div>

               <div>
  <p className="text-xs text-slate-500">
    Status
  </p>

  <select
    value={selectedVisa.status}
    onChange={async (e) => {
      const newStatus = e.target.value;

      try {
        const response = await adminFetch(
          `http://localhost:4020/api/visa-requests/${selectedVisa._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to update status"
          );
        }

        setSelectedVisa(data.request);

setRecentVisas((currentVisas) =>
  currentVisas.map((request) =>
    request._id === data.request._id
      ? data.request
      : request
  )
);

setNewCount((currentCount) => {
  const wasNew = selectedVisa.status === "New";
  const isNowNew = data.request.status === "New";

  if (wasNew && !isNowNew) {
    return Math.max(0, currentCount - 1);
  }

  if (!wasNew && isNowNew) {
    return currentCount + 1;
  }

  return currentCount;
});

setCompletedCount((currentCount) => {
  const wasCompleted = selectedVisa.status === "Completed";
  const isNowCompleted = data.request.status === "Completed";

  if (!wasCompleted && isNowCompleted) {
    return currentCount + 1;
  }

  if (wasCompleted && !isNowCompleted) {
    return Math.max(0, currentCount - 1);
  }

  return currentCount;
});

toast.success("Visa request updated successfully!");

      
      } catch (error) {
        console.error("Visa status update error:", error);

        toast.error("Unable to update visa request.");
      }
    }}
    className="mt-2 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/50"
  >
    <option value="New">New</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div>

              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-500">
                  Additional Information
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedVisa.additionalInformation ||
                    "No additional information provided."}
                </p>
              </div>

            <div className="mt-6">
  <p className="text-xs text-slate-500">
    Internal Notes
  </p>

  <textarea
    value={selectedVisa.notes || ""}
    onChange={(e) =>
      setSelectedVisa({
        ...selectedVisa,
        notes: e.target.value,
      })
    }
    placeholder="Add an internal note about this visa request..."
    rows={4}
    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50"
  />

  <button
    type="button"
    onClick={async () => {
      try {
        const response = await adminFetch(
          `http://localhost:4020/api/visa-requests/${selectedVisa._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: selectedVisa.status,
              notes: selectedVisa.notes || "",
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to save notes"
          );
        }

        setSelectedVisa(data.request);

        setRecentVisas((currentVisas) =>
          currentVisas.map((request) =>
            request._id === data.request._id
              ? data.request
              : request
          )
        );

      toast.success("Internal notes saved successfully!");
      } catch (error) {
        console.error("Visa notes update error:", error);

        toast.error("Unable to save internal notes.");
      }
    }}
    className="mt-3 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
  >
    Save Notes
  </button>
</div>

            </div>
          </section>
        )}

      {deleteVisaConfirm && selectedVisa && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-red-400">
          <span className="text-xl">!</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">
            Delete Visa Request?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Are you sure you want to delete the visa request from{" "}
            <span className="font-semibold text-white">
              {selectedVisa.fullName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setDeleteVisaConfirm(false)}
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={async () => {
            try {
              const response = await adminFetch(
                `http://localhost:4020/api/visa-requests/${selectedVisa._id}`,
                {
                  method: "DELETE",
                }
              );

              const data = await response.json();

              if (!response.ok) {
                throw new Error(
                  data.message || "Failed to delete visa request"
                );
              }

              setRecentVisas((currentVisas) =>
                currentVisas.filter(
                  (request) => request._id !== selectedVisa._id
                )
              );

              setVisaCount((currentCount) =>
                Math.max(0, currentCount - 1)
              );

              if (selectedVisa.status === "New") {
                setNewCount((currentCount) =>
                  Math.max(0, currentCount - 1)
                );
              }

              if (selectedVisa.status === "Completed") {
                setCompletedCount((currentCount) =>
                  Math.max(0, currentCount - 1)
                );
              }

              setDeleteVisaConfirm(false);
              setSelectedVisa(null);

              toast.success("Visa request deleted successfully!");
            } catch (error) {
              console.error("Visa delete error:", error);

              toast.error("Unable to delete visa request.");
            }
          }}
          className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Delete Request
        </button>
      </div>
    </div>
  </div>
)}  

      </main>
    </div>
  );
}

export default AdminDashboard;
