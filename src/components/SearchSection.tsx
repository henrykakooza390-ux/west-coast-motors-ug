import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const navigate = useNavigate();

  const [make, setMake] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    navigate(
      `/search?make=${make}&location=${location}&price=${price}`
    );
  };

  return (
    <section
      className="
      max-w-7xl
      mx-auto
      px-4 md:px-6
      -mt-10 md:-mt-12
      relative
      z-20
      "
    >
      <div
        className="
bg-white/90
backdrop-blur-premium
rounded-[32px]
shadow-luxury
p-6 md:p-8
border border-white/60
"
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-4
          "
        >
          {/* MAKE */}

          <input
            type="text"
            placeholder="Any Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="
            border
            border-gray-200
            rounded-2xl
            p-4
            focus:outline-none
            focus:ring-2
            focus:ring-brand-red
            transition
            "
          />

          {/* LOCATION */}

          <input
            type="text"
            placeholder="Any Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="
            border
            border-gray-200
            rounded-2xl
            p-4
            focus:outline-none
            focus:ring-2
            focus:ring-brand-red
            transition
            "
          />

          {/* PRICE */}

          <input
            type="text"
            placeholder="Any Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="
            border
            border-gray-200
            rounded-2xl
            p-4
            focus:outline-none
            focus:ring-2
            focus:ring-brand-red
            transition
            "
          />

          {/* BUTTON */}

          <button
  onClick={handleSearch}
  className="
  bg-brand-red
  hover:bg-brand-redDark
  text-white
  rounded-2xl
  font-bold
  px-8
  py-4
  shadow-premium
  transition-all
  duration-300
  hover:shadow-luxury
  hover:scale-[1.02]
  active:scale-95
  "
>
            Search Cars
          </button>
        </div>
      </div>
    </section>
  );
}