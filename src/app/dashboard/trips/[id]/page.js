// components/TripDetails.js

"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTrips } from "../../../redux/features/trips";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TripMap from "../../../components/Map";

const TripDetails = ({ params }) => {
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { trips } = useSelector((store) => store.trips);

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrapped = await params;
      setUnwrappedParams(unwrapped);
    };
    unwrapParams();
  }, [params]);

  const { id } = unwrappedParams || {};

  // Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      if (id) {
        if (Array.isArray(trips.trips) && trips.trips.length > 0) {
          const foundTrip = trips.trips?.find(
            (trip) => trip.id === parseInt(id)
          );
          if (foundTrip) {
            setTrip(foundTrip);
            setLoading(false);
            return;
          }
        }
        try {
          setLoading(true);
          await dispatch(fetchAllTrips());
          const foundTrip = trips.trips.find(
            (trip) => trip.id === parseInt(id)
          );
          setTrip(foundTrip || null);
        } catch (error) {
          console.error("Error fetching trip details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTripDetails();
  }, [id, trips.trips, dispatch]);

  return (
    <>
      {loading ? (
        <Skeleton
          baseColor="#c0c0c0"
          highlightColor="#8479D1"
          count={4}
          height={100}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/trips">
              <IoArrowBackCircleSharp className="text-primary text-5xl" />
            </Link>
            <p className="text-2xl font-bold text-white">Trip #{trip.id}</p>
          </div>
          <section className="flex items-center justify-between gap-8 mt-8">
            <div className="w-1/2">
              <TripMap 
                pickupLat={trip.pickup_lat} 
                pickupLng={trip.pickup_lng} 
                dropoffLat={trip.dropoff_lat} 
                dropoffLng={trip.dropoff_lng} 
              />
            </div>
            <div className="w-1/2 space-y-12">
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">{trip.pickup_date}</p>
                    <div className="flex items-center gap-1 text-sm text-yellow">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <button
                    className={`${
                      trip.status === "COMPLETED" ? "bg-green" : "bg-warning"
                    } px-3 py-2 rounded-3xl text-xs text-white`}
                  >
                    {trip.status}
                  </button>
                </div>
              </section>
              <section className="flex items-center justify-between">
                <div>
                  <p className="text-gray uppercase text-xs">Price</p>
                  <div className="flex items-center gap-2 text-white text-2xl font-bold">
                    <span>{trip.cost_unit}</span>
                    <span>{trip.cost}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray uppercase text-xs">Duration</p>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <span>{trip.duration} mins</span>
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-2">
                    <IoLocation className="text-green" />
                    <p>{trip.pickup_location}</p>
                  </div>
                  <p>{trip.pickup_date}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-white">
                  <div className="flex items-center gap-2">
                    <IoLocation className="text-red" />
                    <p>{trip.dropoff_location}</p>
                  </div>
                  <p>{trip.dropoff_date}</p>
                </div>
              </section>
            </div>
          </section>
          <section className="flex items-center justify-between gap-4 my-12">
            <div className="w-3/12">
              <p className="text-gray uppercase text-sm mb-2">Driver Info</p>
              <div className="border border-primary rounded-3xl p-4">
                <img
                  className="rounded-3xl object-cover w-full h-[15vh]"
                  src={trip.driver_pic}
                  alt="driver"
                />
                <section className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-gray uppercase text-xs">Driver Name</p>
                    <p className="text-white text-sm">{trip.driver_name}</p>
                  </div>
                  <div className="bg-primary rounded-3xl px-4 py-1 text-sm flex items-center gap-2">
                    <FaStar className="text-yellow" />
                    <span>{trip.driver_rating}</span>
                  </div>
                </section>
              </div>
            </div>
            <div className="w-8/12">
              <p className="text-gray uppercase text-sm">Car Info</p>
              <div className="border border-primary rounded-3xl p-4">
                <section className="flex items-center gap-4 justify-between">
                  <div className="w-1/2">
                    <img
                      className="rounded-3xl object-cover w-full h-[20vh]"
                      src={trip.car_pic}
                      alt="driver"
                    />
                  </div>
                  <div className="w-1/2 space-y-8">
                    <section className="flex items-center justify-between">
                      <div>
                        <p className="text-gray uppercase text-xs">
                          Make/Model
                        </p>
                        <p className="text-white text-sm">{trip.car_make}</p>
                      </div>
                      <div>
                        <p className="text-gray uppercase text-xs">Year</p>
                        <p className="text-white text-sm">{trip.car_year}</p>
                      </div>
                    </section>
                    <section className="flex items-center justify-between">
                      <div>
                        <p className="text-gray uppercase text-xs">Plate</p>
                        <p className="text-white text-sm">{trip.car_number}</p>
                      </div>
                      <div>
                        <p className="text-gray uppercase text-xs">Color</p>
                        <p className="text-white text-sm">white</p>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default TripDetails;
