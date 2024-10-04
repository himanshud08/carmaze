
import { useEffect, useState } from 'react';

interface Car {
  name: string;
  drive_type: string;
  price_per_day: number;
}

const CarsCatalogue = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data: Car[] = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Car Catalogue</h1>
      <ul>
        {cars.map((car, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <h2>{car.name}</h2>
            <p>{car.drive_type}</p>
            <p>Price per day: ₹{car.price_per_day}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarsCatalogue;
