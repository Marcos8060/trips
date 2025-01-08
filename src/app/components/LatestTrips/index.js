import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const LatestTrips = () => {
  const { trips } = useSelector((store) => store.trips);

  const recentTrips = Array.isArray(trips.trips)
    ? [...trips.trips]
        .sort((a, b) => new Date(b.request_date) - new Date(a.request_date))
        .slice(0, 5)
    : [];

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-white text-xl">Latest Trips</h1>
        <Link
          href="/dashboard/trips"
          className="text-primary font-bold text-sm"
        >
          See all
        </Link>
      </div>
      <section className="space-y-4">
        {recentTrips.map((trip,index) => (
          <div
            key={trip.id}
            className=" text-white"
          >
            <section className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-6">
                <h1 className="text-2xl font-semibold text-yellow">{index + 1}</h1>
                <p className="font-semibold">{trip.dropoff_location}</p>
              </div>
              <div className="">
                <p className="font-thin text-xs">{trip.request_date}</p>
              </div>
            </section>
          </div>
        ))}
      </section>
    </>
  );
};

export default LatestTrips;
