import React from 'react';

const ImpactBar = () => {
  return (
    <div className="bg-white text-black p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Impact</h2>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* User Portrait and Quote */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
        src="images/impactbarimg.jpg"
        alt="User Portrait"
        className="w-40 h-40 object-cover rounded-full border border-white mb-2"
          />
          <p className="font-semibold">Sean Hall</p>
          <p className="italic text-sm text-center mt-2 max-w-xs">
        "Thanks to MerryMeal, my elderly mother gets nutritious meals daily!"
          </p>
        </div>

        {/* Stats Box with Top and Bottom Text */}
        <div className="flex-1 border border-black p-6 flex flex-col gap-4">
          {/* Top Text */}
          <p className="text-center text-sm text-black-300">
            Our reach continues to grow thanks to our generous supporters and tireless volunteers.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold">12,500+</p>
              <p className="text-sm">People Helped</p>
            </div>
            <div>
              <p className="text-3xl font-bold">75,000+</p>
              <p className="text-sm">Meals Delivered</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1,200+</p>
              <p className="text-sm">Volunteers</p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-sm text-black-400 mt-4">
            Every meal delivered brings hope to someone in need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactBar;