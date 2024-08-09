// src/components/NotificationPrompt.js
import React from 'react';
import { useRouter } from 'next/router';

export default function NotificationPrompt() {
  const router = useRouter();

  const handleAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Redirect to dashboard with coordinates as query params
          router.push(`/dashboard?lat=${latitude}&lng=${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Redirect to dashboard without location if error occurs
          router.push('/dashboard');
        }
      );
    } else {
      // Redirect to dashboard if geolocation is not supported
      router.push('/dashboard');
    }
  };

  const handleDeny = () => {
    router.push('/dashboard'); // Proceed to dashboard without location access
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded shadow-md p-8">
        <h1 className="text-xl font-semibold mb-6">Allow "Wildfire Prediction App" to use your location?</h1>
        <p className="mb-4">
          Access to your location allows us to send you notifications and warn you if the fire is getting closer.
        </p>
        <div className="mb-4">
          <img src="/map_placeholder.png" alt="Map" className="w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={handleAllow} className="bg-blue-500 text-white py-2 rounded">
            Allow Once
          </button>
          <button onClick={handleAllow} className="bg-blue-500 text-white py-2 rounded">
            Allow While Using the App
          </button>
          <button onClick={handleDeny} className="bg-gray-500 text-white py-2 rounded">
            Don’t Allow
          </button>
        </div>
      </div>
    </div>
  );
}
