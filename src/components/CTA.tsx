export default function CTA() {
  return (
    <section className="py-28 bg-gradient-to-r from-blue-700 via-blue-600 to-slate-900 text-white">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-5xl md:text-6xl font-black mb-6">
          Ready To Find
          <span className="block text-blue-200">
            Your Next Vehicle?
          </span>
        </h2>

        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Browse verified vehicles from trusted sellers across Uganda
          and discover your perfect car today.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Browse Vehicles
          </button>

          <button className="border border-white px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition">
            Contact Us
          </button>

        </div>

      </div>

    </section>
  );
}