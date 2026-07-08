import siteConfig from "../config/siteConfig";

export default function Stats() {
  return (
    <section className="py-16 md:py-24 bg-brand-black text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* OPTIONAL BRAND CONTEXT (uses siteConfig for future scalability) */}
        <div className="text-center mb-12">
          <p className="text-brand-red uppercase tracking-widest text-xs md:text-sm font-semibold">
            {siteConfig.shortName}
          </p>

          <h2 className="text-xl md:text-2xl font-bold mt-2">
            Trusted Automotive Marketplace in Uganda
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-red">
              2,500+
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Vehicles Listed
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-red">
              850+
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Verified Sellers
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-red">
              50+
            </h2>

            <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-200">
              Locations
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-red">
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