export default function Testimonials() {
  const testimonials = [
    {
      name: "James",
      text: "Found my Toyota Harrier in just two days.",
    },
    {
      name: "Sarah",
      text: "Very easy platform and trustworthy sellers.",
    },
    {
      name: "Michael",
      text: "Sold my vehicle much faster than expected.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          What Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >
              <p className="text-gray-600 mb-6">
                "{item.text}"
              </p>

              <h3 className="font-bold">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}