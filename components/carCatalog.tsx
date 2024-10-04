"use client";

import { useState } from 'react';
import carData from '../data/carData';
import CustomerDetailsDialog from '../components/CustomerDetailsDialog'; // Adjust the import based on your file structure

interface Car {
  id: number;
  image: string;
  name: string;
  description: string;
  seater: string;
  fuel: string;
  f: string;
  gp: string;
  gear: string;
}

const CarCatalog: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    contactNumber: false,
    email: false,
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ firstName: '', lastName: '', contactNumber: '', email: '' }); // Reset form on close
    setErrors({ firstName: false, lastName: false, contactNumber: false, email: false }); // Reset errors
  };

  const handleSubmit = (data: { firstName: string; lastName: string; contactNumber: string; email: string; }) => {
    // Process form submission here
    console.log('Form data:', data);
  };

  return (
    <div className="car-catalog">
      <h1 className='text-extrabold'>Car Catalog</h1>
      <div className="car-list">
        {carData.map((car: Car) => (
          <div key={car.id} className="car-card">
            <img className="h-40 w-full flex justify-center items-center" src={car.image} alt={car.name} />
            <h2>{car.name}</h2>
            <p>{car.description}</p>
            <p>{car.seater}</p>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <img className="h-5" src={car.fuel} alt={car.fuel} style={{ borderRadius: '0' }} />
                <p className="ml-2">{car.f}</p>
              </div>
              <div className="flex items-center">
                <img className="h-4" src={car.gp} alt={car.gp} style={{ borderRadius: '0' }} />
                <p className="ml-2">{car.gear}</p>
              </div>
            </div>
            <button 
              onClick={handleOpenDialog} 
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 w-full text-center hover:bg-blue-700"
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>

      <CustomerDetailsDialog 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <style jsx>{`
        .car-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .car-card {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 10px;
        }
        .car-card img {
          max-width: 100%;
          border-radius: 10px;
        }
        .input {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default CarCatalog;
