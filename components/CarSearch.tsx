import React, { useState } from 'react';

interface CarSearchQuery {
  model: string;
  fuel: string;
  year: string;
}

interface CarDetails {
  model: string;
  fuel: string;
  year: string;
  seats: number;
  price: string;
}

const CarSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<CarSearchQuery>({
    model: '',
    fuel: '',
    year: '',
  });
  
  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cars?model=${searchQuery.model}&fuel=${searchQuery.fuel}&year=${searchQuery.year}`);
      if (!response.ok) throw new Error('No car found');
      
      const data: CarDetails = await response.json();
      setCarDetails(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Car Catalogue</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="model"
            placeholder="Model"
            value={searchQuery.model}
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="fuel" value={searchQuery.fuel} onChange={handleChange}>
            <option value="">Select Fuel</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
        <div>
          <select name="year" value={searchQuery.year} onChange={handleChange}>
            <option value="">Select Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {carDetails && (
        <div>
          <h2>{carDetails.model}</h2>
          <p>Fuel: {carDetails.fuel}</p>
          <p>Year: {carDetails.year}</p>
          <p>Seats: {carDetails.seats}</p>
        </div>
      )}
    </div>
  );
};

export default CarSearch;
