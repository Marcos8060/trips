'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTrips } from '../../../redux/features/trips';

const TripDetails = ({ params }) => {
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrapped = await params;
      setUnwrappedParams(unwrapped);
    };
    unwrapParams();
  }, [params]);

  const { id } = unwrappedParams || {}; 
  const dispatch = useDispatch();
  const { trips } = useSelector((store) => store.trips);

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (id) {
        if (Array.isArray(trips.trips) && trips.trips.length > 0) {
          const foundTrip = trips.trips.find((trip) => trip.id === parseInt(id));
          if (foundTrip) {
            setTrip(foundTrip);
            setLoading(false);
            return;
          }
        }
        try {
          setLoading(true);
          await dispatch(fetchAllTrips());
          const foundTrip = trips.trips.find((trip) => trip.id === parseInt(id));
          setTrip(foundTrip || null);
        } catch (error) {
          console.error('Error fetching trip details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTripDetails();
  }, [id, trips.trips, dispatch]);

  if (loading) {
    return <div>Loading trip details...</div>;
  }

  if (!trip) {
    return <div>Trip not found</div>;
  }

  return (
    <div>
      <h1>Trip Details</h1>
      <p><strong>ID:</strong> {trip.id}</p>
      <p><strong>Pickup Location:</strong> {trip.pickup_location}</p>
      <p><strong>Dropoff Location:</strong> {trip.dropoff_location}</p>
      <p><strong>Status:</strong> {trip.status}</p>
      <p><strong>Cost:</strong> {trip.cost}</p>
      <p><strong>Distance:</strong> {trip.distance} {trip.distance_unit}</p>
      <p><strong>Duration:</strong> {trip.duration} mins</p>
    </div>
  );
};

export default TripDetails;
