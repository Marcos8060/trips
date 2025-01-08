"use client";
import React from "react";
import { useSelector } from "react-redux";
import { IoLocation } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const CanceledTrips = () => {
  const { trips } = useSelector((store) => store.trips);

  const canceledTrips =
    Array.isArray(trips.trips) &&
    trips.trips.filter((trip) => trip.status === "CANCELED");

  return (
    <section className="grid grid-cols-4 gap-4">
      {Array.isArray(canceledTrips) &&
        canceledTrips.map((trip) => (
          <div key={trip.id} className="trip__background rounded-3xl relative">
            <section className="">
              <p className="absolute left-4 top-4 text-sm">
                {trip.request_date}
              </p>
              <button
                className={`${
                  trip.status === "COMPLETED" ? "bg-green" : "bg-warning"
                } absolute px-3 py-2 rounded-3xl text-xs text-white left-52 top-3`}
              >
                {trip.status}
              </button>
              <div className="flex items-center gap-1 absolute left-52 top-14 text-sm text-yellow">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </section>
            <section>
              <div className="flex gap-2 items-center absolute top-24 left-2">
                <IoLocation className="bg-green rounded-full p-1 text-2xl" />
                <small>{trip.pickup_location}</small>
              </div>
              <div className="flex gap-2 items-center absolute top-32 left-2">
                <IoLocation className="bg-warning rounded-full p-1 text-2xl" />
                <small>{trip.dropoff_location}</small>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-4 absolute top-48 left-4">
                <p className="font-bold text-xl">{trip.cost_unit}</p>
                <p className="font-bold text-xl">{trip.cost}</p>
              </div>
              <div className="absolute top-56 left-4">
                <p className="text-sm">
                  {trip.distance}
                  {trip.distance_unit}
                </p>
              </div>
            </section>
          </div>
        ))}
    </section>
  );
};

export default CanceledTrips;
