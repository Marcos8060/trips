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

  // Calculate the destination counts
  const destinationCounts = useMemo(() => {
    if (!Array.isArray(trips.trips)) return {};

    return trips.trips.reduce((acc, trip) => {
      const destination = trip.dropoff_location || "Unknown";
      acc[destination] = (acc[destination] || 0) + 1;
      return acc;
    }, {});
  }, [trips]);

  // Prepare the top 3 destinations
  const topDestinations = useMemo(() => {
    return Object.entries(destinationCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 3)
      .map(([destination, count]) => ({
        name: destination,
        y: count,
      }));
  }, [destinationCounts]);

  // Chart options
  const options = useMemo(
    () => ({
      chart: {
        type: "pie",
        height: 300,
      },
      title: {
        text: "Top 3 Destinations Visited by Customers",
        style: {
          fontSize: "16px",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} trips)",
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
          innerSize: "50%", // Donut chart
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f}%",
          },
        },
      },
      series: [
        {
          name: "Trips",
          colorByPoint: true, // Automatically assign different colors to each slice
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
