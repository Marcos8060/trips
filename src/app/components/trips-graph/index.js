"use client";
import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exportingInit from "highcharts/modules/exporting";
import { useSelector } from "react-redux";

if (typeof Highcharts === "object") {
  exportingInit(Highcharts);
}

const TripsGraph = () => {
  const { trips } = useSelector((store) => store.trips);

  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const tripsPerMonth = Array.isArray(trips.trips)
    ? trips.trips.reduce((acc, trip) => {
        const monthIndex = new Date(trip.request_date).getMonth();
        acc[monthIndex] = (acc[monthIndex] || 0) + 1;
        return acc;
      }, new Array(12).fill(0))
    : new Array(12).fill(0);

  const [options] = useState({
    chart: {
      type: "line",
      height: 300,
    },
    title: {
      text: "Number of Trips Per Month",
      style: {
        fontSize: "16px",
      },
    },
    xAxis: {
      categories: allMonths,
      title: {
        text: "Months",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Trips",
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        name: "Trips",
        data: tripsPerMonth,
        color: "#007BFF",
      },
    ],
  });

  return (
    <div className="my-2">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TripsGraph;
