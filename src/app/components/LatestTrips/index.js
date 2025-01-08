import React from "react";
import { useSelector } from "react-redux";

const LatestTrips = () => {
  const { trips } = useSelector((store) => store.trips);

  const recentTrips = Array.isArray(trips.trips)
    ? [...trips.trips]
        .sort((a, b) => new Date(b.request_date) - new Date(a.request_date))
        .slice(0, 5)
    : [];

  return (
    <>
      <h1 className="mb-4 font-bold">Latest Trips</h1>
      <section className="space-y-4">
        {recentTrips.map((trip) => (
          <div key={trip.id} className="flex items-center justify-between">
            <h1 className="font-bold text-xl">{trip.dropoff_location}</h1>
            <p className="font-thin text-sm">{trip.request_date}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default LatestTrips;
