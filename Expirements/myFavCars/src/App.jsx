import { useEffect, useState } from "react";

const API_URL = "https://car-api-sigma.vercel.app/api/cars";

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const result = await response.json();

        setCars(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading cars...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">
          Error: {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Cars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-bold">
              {car.name}
            </h2>

            <p className="text-gray-500 mb-4">
              {car.model}
            </p>

            <div className="space-y-2">
              <p>
                <strong>Category:</strong> {car.category}
              </p>

              <p>
                <strong>Color:</strong> {car.color}
              </p>

              <p>
                <strong>Engine:</strong> {car.engine}
              </p>

              <p>
                <strong>Price:</strong> $
                {car.price.toLocaleString()}
              </p>

              <p>
                <strong>Top Speed:</strong> {car.speed} km/h
              </p>

              <p className="text-gray-600 mt-3">
                {car.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;