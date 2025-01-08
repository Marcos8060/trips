"use client";
import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exportingInit from "highcharts/modules/exporting";
import { useSelector } from "react-redux";

if (typeof Highcharts === "object") {
  exportingInit(Highcharts);
}

const TopDestinations = () => {
  const { trips } = useSelector((store) => store.trips);

  const destinationCounts = useMemo(() => {
    if (!Array.isArray(trips.trips)) return {};

    return trips.trips.reduce((acc, trip) => {
      const destination = trip.dropoff_location || "Unknown";
      acc[destination] = (acc[destination] || 0) + 1;
      return acc;
    }, {});
  }, [trips]);

    const getCustomColor = (index) => {
      const colors = ["#8479D1", "#FFDAA3", "#FF7777"];
      return colors[index % colors.length]; 
    };

  const topDestinations = useMemo(() => {
    return Object.entries(destinationCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 3)
      .map(([destination, count], index) => ({
        name: destination,
        y: count,
        color: getCustomColor(index),
      }));
  }, [destinationCounts]);



  // Chart options
  const options = useMemo(
    () => ({
      chart: {
        type: "pie",
        height: 300,
        backgroundColor: "#151515",
        borderRadius: 20,
        borderColor: "#8479D1",
        borderWidth: 1,
      },
      title: {
        text: "Top 3 Destinations",
        style: {
          fontSize: "16px",
          color: "#FFFFFF",
        },
      },
      tooltip: {
        pointFormat:
          "{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} trips)",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          innerSize: "50%",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f}%",
          },
        },
      },
      series: [
        {
          name: "Trips",
          colorByPoint: true,
          data: topDestinations,
        },
      ],
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
    }),
    [topDestinations]
  );

  return (
    <div className="my-2">
      {topDestinations.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p>No trips data available for top destinations.</p>
      )}
    </div>
  );
};

export default TopDestinations;
