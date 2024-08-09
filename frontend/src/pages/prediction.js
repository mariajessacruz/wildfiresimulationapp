import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function PredictionDashboard() {
  const router = useRouter();
  const { location } = router.query;
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (location) {
      fetch(`/api/predict?location=${location}`)
        .then((response) => response.json())
        .then((data) => setPredictions(data))
        .catch((error) => console.error('Error fetching predictions:', error));
    }
  }, [location]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">7-Day Prediction for {location}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((day, index) => (
          <div key={index} className="p-4 bg-white shadow rounded">
            <div className="text-xl font-bold">{day.date}</div>
            <div className="flex items-center">
              <img src={day.icon} alt="fire icon" className="w-8 h-8 mr-2" />
              <span>{day.prediction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
