import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Production-ready scalable SaaS products
        </h1>
        <p className="text-xl sm:text-2xl text-black mb-8">
          Unlock your business potential with our production-ready scalable SaaS products designed to streamline your operations and drive growth
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user ? (
            <Link to="/dashboard" className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center">
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <>
              <button className="px-6 py-3 bg-white text-green-600 rounded-full font-semibold shadow-lg hover:bg-opacity-90 transition duration-300 ease-in-out flex items-center justify-center">
                Learn more
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link to="/auth" className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center">
                Get started
                <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;