import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [mapSrc, setMapSrc] = useState('');
  const router = useRouter();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const { lat, lng } = router.query;

    if (lat && lng) {
      setMapSrc(
        `https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey}&center=${lat},${lng}&zoom=12&markers=${lat},${lng}`
      );
    } else {
      setMapSrc(
        `https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey}&center=56.1304,-106.3468&zoom=4`
      );
    }
  }, [googleMapsApiKey, router.query]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${googleMapsApiKey}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        router.push(`/prediction?location=${location}`);
      } else {
        alert('Location not found. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while fetching the location. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="map-container">
        <div className="map-header">
          <div className="date-picker-wrapper">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="px-3 py-2 border rounded"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <div className="legend">
            <span className="low">Low</span>
            <span className="medium">Medium</span>
            <span className="high">High</span>
            <span className="very-high">Very High</span>
            <span className="extreme">Extreme</span>
          </div>
        </div>
        <iframe
          src={mapSrc}
          width="100%"
          height="500"
          frameBorder="1"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
      <form onSubmit={handleLocationSearch} className="w-full max-w-5xl flex items-center mt-4">
        <input
          type="text"
          className="flex-grow px-3 py-2 border rounded"
          placeholder="Search location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </Layout>
  );
}
