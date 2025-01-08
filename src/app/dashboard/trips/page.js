"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllTrips from "../../components/Tabs/AllTrips";
import CompletedTrips from "../../components/Tabs/CompletedTrips";
import CanceledTrips from "../../components/Tabs/CanceledTrips";
import SearchResults from "../../components/SearchResults";

const Trips = () => {
  const { trips } = useSelector((store) => store.trips);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredTrips =
    Array.isArray(trips.trips) &&
    trips.trips.filter((trip) => {
      const keyword = searchKeyword.toLowerCase();
      return (
        trip.pickup_location?.toLowerCase().includes(keyword) ||
        trip.dropoff_location?.toLowerCase().includes(keyword) ||
        trip.type?.toLowerCase().includes(keyword) ||
        trip.driver_name?.toLowerCase().includes(keyword) ||
        trip.car_make?.toLowerCase().includes(keyword) ||
        trip.car_model?.toLowerCase().includes(keyword) ||
        trip.car_number?.toLowerCase().includes(keyword)
      );
    });

  return (
    <div>
      <form>
        <label className="uppercase text-xs font-bold" htmlFor="">
          Keyword
        </label>
        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="block px-4 py-3 rounded-xl text-sm w-1/3 focus:outline-none"
          type="text"
          placeholder="Search by distance, duration, keyword"
        />
      </form>
      
      {searchKeyword ? (
        <SearchResults trips={filteredTrips} />
      ) : (
        <>
          <section className="my-6">
            <h2 className="mb-3">Status</h2>
            <div className="bg-primary rounded-2xl flex items-center gap-1 p-1 w-1/3 cursor-pointer">
              <h3
                onClick={() => setCurrentTab(0)}
                className={`${
                  currentTab === 0
                    ? "bg-white px-3 py-2 rounded-2xl text-sm w-4/12 text-center"
                    : "px-3 py-2 rounded-2xl text-sm w-4/12 text-center text-white"
                }  `}
              >
                All Trips
              </h3>
              <h3
                onClick={() => setCurrentTab(1)}
                className={`${
                  currentTab === 1
                    ? "bg-white px-3 py-2 rounded-2xl text-sm w-4/12 text-center"
                    : "px-3 py-2 rounded-2xl text-sm w-4/12 text-center text-white"
                }  `}
              >
                Completed
              </h3>
              <h3
                onClick={() => setCurrentTab(2)}
                className={`${
                  currentTab === 2
                    ? "bg-white px-3 py-2 rounded-2xl text-sm w-4/12 text-center"
                    : "px-3 py-2 rounded-2xl text-sm w-4/12 text-center text-white"
                }`}
              >
                Canceled
              </h3>
            </div>
          </section>
          {currentTab === 0 && <AllTrips />}
          {currentTab === 1 && <CompletedTrips />}
          {currentTab === 2 && <CanceledTrips />}
        </>
      )}
    </div>
  );
};

export default Trips;
