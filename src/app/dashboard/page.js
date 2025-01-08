"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrips } from "../redux/features/trips";
import TripsGraph from "../components/trips-graph/";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LatestTrips from "../components/LatestTrips";
import TopDestinations from "../components/TopDestinations";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { trips } = useSelector((store) => store.trips);
  const [loading, setLoading] = useState(true);

  const getTrips = async () => {
    try {
      setLoading(true);
      await dispatch(fetchAllTrips());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      <div className="w-full">
        {loading ? (
          <Skeleton
            baseColor="#c0c0c0"
            highlightColor="#f0f0f0"
            count={2}
            height={100}
          />
        ) : (
          <TripsGraph />
        )}
      </div>
      <section className="flex gap-4 justify-between my-4">
        <div className="w-1/2">
          <LatestTrips />
        </div>
        <div className="w-1/2">
          <TopDestinations />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
