import React from 'react';

const TurfLoc = ({ venue }) => {
  return (
    <div className="mt-5">
      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 my-4 border-b-2 border-emerald-800">
        Map Location
      </span>
      <div className="outline-none h-[2px] w-full bg-slate-300 border-none"></div>

      <div className="grid grid-cols-2  space-x-2 p-3">
        <div>
          <span className="font-bold">Address</span>
          <p className="text-gray-700">{venue.address}</p>
        </div>
        <div>
          <span className="font-bold">Area</span>
          <p className="text-gray-700">{venue.area}</p>
        </div>
      </div>
    </div>
  );
};

export default TurfLoc;