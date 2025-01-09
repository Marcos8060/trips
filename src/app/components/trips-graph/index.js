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
        const monthIndex = new Date(trip.pickup_date).getMonth();
        acc[monthIndex] = (acc[monthIndex] || 0) + 1;
        return acc;
      }, new Array(12).fill(0))
    : new Array(12).fill(0);

  const [options] = useState({
    chart: {
      type: "line",
      height: 300,
      backgroundColor: "#151515", 
      borderRadius: 20,           
      borderColor: "#8479D1",    
      borderWidth: 1,
    },
    title: {
      text: "Number of Trips Per Month",
      style: {
        fontSize: "14px",
        color: "#FFFFFF",
      },
    },
    xAxis: {
      categories: allMonths,
      title: {
        text: "Months",
        style: {
          color: "#FFFFFF",
        },
      },
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Trips",
        style: {
          color: "#FFFFFF", 
        },
      },
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
      gridLineWidth: 0,
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
        color: "#8479D1",
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
