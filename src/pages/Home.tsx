import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedCars from "../components/FeaturedCars";
import BestDeals from "../components/BestDeals";
import LatestArrivals from "../components/LatestArrivals";
import RecentlyViewed from "../components/RecentlyViewed";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">

      <NavBar />

      {/* HERO */}
      <Hero />

      {/* SEARCH */}
      <div className="-mt-12 relative z-20">
        <SearchSection />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1">

        {/* CATEGORIES */}
        <section className="pt-10">
          <CategoryGrid />
        </section>

        {/* FEATURED */}
        <section className="pt-10">
          <FeaturedCars />
        </section>

        {/* BEST DEALS */}
        <section className="pt-6">
          <BestDeals />
        </section>

        {/* LATEST ARRIVALS */}
        <section className="pt-6">
          <LatestArrivals />
        </section>

        {/* RECENTLY VIEWED */}
        <section className="pt-6">
          <RecentlyViewed />
        </section>

        {/* WHY CHOOSE US */}
        <section
          className="
          mt-20
          py-24
          bg-gradient-to-b
          from-white
          to-slate-50
          "
        >
          <WhyChooseUs />
        </section>

        {/* STATS */}
        <section
          className="
          py-20
          bg-gradient-to-b
          from-slate-50
          to-white
          "
        >
          <Stats />
        </section>

      </main>

      <Footer />

    </div>
  );
}