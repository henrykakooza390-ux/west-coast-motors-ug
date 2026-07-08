import { ShieldCheck, BadgeCheck, MapPin, Handshake } from "lucide-react";
import siteConfig from "../config/siteConfig";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={40} className="text-brand-red" />,
      title: "Verified Listings",
      description:
        "Every vehicle goes through verification before appearing on the platform.",
    },
    {
      icon: <BadgeCheck size={40} className="text-brand-black" />,
      title: "Trusted Dealers",
      description:
        "Connect with reputable dealerships and trusted private sellers.",
    },
    {
      icon: <MapPin size={40} className="text-brand-red" />,
      title: "Nationwide Coverage",
      description:
        "Browse vehicles from Kampala, Entebbe, Jinja and across Uganda.",
    },
    {
      icon: <Handshake size={40} className="text-brand-black" />,
      title: "Safe Transactions",
      description:
        "Helping buyers and sellers connect with confidence.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">

          <span className="text-brand-red uppercase tracking-widest font-semibold text-xs md:text-sm">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-brand-black">
            Built For Confidence
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
            {siteConfig.companyName} is designed to make buying and selling vehicles
            easier, safer and more transparent.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="
                bg-gray-50
                rounded-3xl
                p-6 md:p-8
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
                text-center
              "
            >
              <div className="mb-5 flex justify-center">
                {feature.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 text-brand-black">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}