import { categories } from "../data/categories";

export default function BrowseByCategory() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="mb-10">

        <h2 className="text-4xl font-bold">
          Browse By Body Type
        </h2>

        <p className="text-gray-500 mt-2">
          Find vehicles that fit your lifestyle.
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">

        {categories.map((category) => (

          <div
            key={category.name}
            className="
              bg-white
              rounded-3xl
              p-6
              text-center
              shadow
              hover:shadow-xl
              hover:-translate-y-1
              transition
              cursor-pointer
            "
          >

            <div className="text-4xl mb-4">
              {category.icon}
            </div>

            <h3 className="font-semibold">
              {category.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}