export default function Stats() {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400">
              2,500+
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Vehicles Listed
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400">
              850+
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Verified Sellers
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400">
              50+
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Locations
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400">
              99%
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Customer Satisfaction
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}