"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllTrips from "../../components/Tabs/AllTrips";
import CompletedTrips from "../../components/Tabs/CompletedTrips";
import CanceledTrips from "../../components/Tabs/CanceledTrips";
import SearchResults from "../../components/SearchResults";
import FilterDistance from "../../components/FilterDistance";
import FilterTime from "../../components/FilterTime";
import { fetchAllTrips } from "../../redux/features/trips";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Trips = () => {
  const { trips } = useSelector((store) => store.trips);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("any");
  const [selectedTime, setSelectedTime] = useState("any");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getTrips = async () => {
    try {
      setLoading(true);
      await dispatch(fetchAllTrips());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  const filteredTrips = useMemo(() => {
    return (
      Array.isArray(trips.trips) &&
      trips.trips.filter((trip) => {
        const keyword = searchKeyword.toLowerCase();
        const matchesKeyword =
          trip.pickup_location?.toLowerCase().includes(keyword) ||
          trip.dropoff_location?.toLowerCase().includes(keyword) ||
          trip.type?.toLowerCase().includes(keyword) ||
          trip.driver_name?.toLowerCase().includes(keyword) ||
          trip.car_make?.toLowerCase().includes(keyword) ||
          trip.car_model?.toLowerCase().includes(keyword) ||
          trip.car_number?.toLowerCase().includes(keyword);

        const matchesDistance =
          selectedDistance === "any" ||
          (selectedDistance === "under3km" && trip.distance < 3) ||
          (selectedDistance === "3to6km" &&
            trip.distance >= 3 &&
            trip.distance <= 6) ||
          (selectedDistance === "6to15km" &&
            trip.distance > 6 &&
            trip.distance <= 15) ||
          (selectedDistance === "above15km" && trip.distance > 15);

        const matchesTime =
          selectedTime === "any" ||
          (selectedTime === "under5mins" && trip.duration < 5) ||
          (selectedTime === "5to10mins" &&
            trip.duration >= 5 &&
            trip.duration <= 10) ||
          (selectedTime === "10to20mins" &&
            trip.duration > 10 &&
            trip.duration <= 20) ||
          (selectedTime === "morethan20mins" && trip.duration > 20);

        return matchesKeyword && matchesDistance && matchesTime;
      })
    );
  }, [trips.trips, searchKeyword, selectedDistance, selectedTime]);

  const renderSkeleton = () => (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          baseColor="#c0c0c0"
          highlightColor="#8479D1"
          height={200}
          className="rounded-lg"
        />
      ))}
    </div>
  );

  const renderTabContent = () => {
    if (loading) return renderSkeleton();

    switch (currentTab) {
      case 0:
        return <AllTrips />;
      case 1:
        return <CompletedTrips />;
      case 2:
        return <CanceledTrips />;
      default:
        return null;
    }
  };

  return (
    <div>
      <section>
        <form>
          <label className="uppercase text-xs font-bold text-white" htmlFor="search">
            Keyword
          </label>
          <input
            id="search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="block px-4 py-3 rounded-xl text-sm w-1/3 focus:outline-none bg-black text-white"
            type="text"
            placeholder="Search by distance, duration, keyword"
          />
        </form>
        <div className="flex items-center justify-between border border-primary rounded-3xl px-4 text-white mt-4">
          <FilterDistance setSelectedDistance={setSelectedDistance} />
          <FilterTime setSelectedTime={setSelectedTime} />
        </div>
      </section>

      {searchKeyword || selectedDistance !== "any" || selectedTime !== "any" ? (
        <SearchResults trips={filteredTrips} />
      ) : (
        <>
          <section className="my-6">
            <div>
              <h2 className="mb-3">Status</h2>
              <div className="bg-black rounded-2xl flex items-center gap-1 p-1 cursor-pointer w-1/3">
                {["All Trips", "Completed", "Canceled"].map((tab, index) => (
                  <h3
                    key={index}
                    onClick={() => setCurrentTab(index)}
                    className={`${
                      currentTab === index
                        ? "bg-primary text-white px-3 py-2 rounded-2xl text-sm w-4/12 text-center"
                        : "px-3 py-2 rounded-2xl text-sm w-4/12 text-center text-gray"
                    }`}
                  >
                    {tab}
                  </h3>
                ))}
              </div>
            </div>
          </section>
          {renderTabContent()}
        </>
      )}
    </div>
  );
};

export default Trips;
