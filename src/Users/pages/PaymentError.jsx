import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../../components/Footer";

const PaymentError = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      {/* Content Section - flex-grow ensures footer stays at bottom */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Payment Failed!
            </h2>
            <p className="text-gray-500 mt-2 px-6">
              Your transaction could not be completed. Please try again later.
            </p>
          </div>

          {/* Action Buttons Section */}
          <div className="px-6 pb-8">
            <Link
              to={"/books"}
              className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 text-center"
            >
              Try Again !!!
            </Link>

            <Link
              to={"/books"}
              className="flex items-center justify-center w-full mt-3 text-gray-500 font-semibold text-sm hover:text-gray-700 transition-colors"
            >
              Back to Books
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentError;