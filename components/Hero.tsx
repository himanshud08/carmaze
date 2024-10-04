"use client";

import Image from "next/image";
import { FC } from "react";
import { FiPhone } from "react-icons/fi"; 

const Hero: FC = () => {
  return (
    <div className="hero flex flex-col-reverse md:flex-row items-center justify-between md:space-x-6 px-6 md:px-12 py-12">
     
      <div className="flex-1 md:pt-35 z-10 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Find, book, rent a car—quick and super easy!
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Streamline your car rental experience with our effortless booking process.
        </p>

      
        <p className="text-lg md:text-xl mb-4 flex items-center">
          <FiPhone className="mr-2 text-blue-500" /> 
          Call us now to book:{" "}
          <a href="tel:7030216777" className="text-blue-500 hover:underline ml-2">
          7030216777
          </a>
        </p>
      </div>

     
      <div className="flex-1 w-full md:w-1/2 relative">
        <Image 
          src="/hero.png" 
          alt="hero" 
          width={600} 
          height={400} 
          className="object-contain mx-auto" 
        />
      </div>
    </div>
  );
};

export default Hero;
