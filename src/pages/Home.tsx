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

function PremiumDivider() {
  return (
    <div className="my-16 w-full">
      <div className="flex h-14 w-full items-center bg-black">

        {/* Brand */}
        <div className="flex items-center whitespace-nowrap px-8">
          <span
            className="
              text-base
              md:text-lg
              font-black
              uppercase
              tracking-[0.18em]
              text-brand-red
            "
          >
            West Coast Motors
          </span>

          <span
            className="
              ml-2
              text-base
              md:text-lg
              font-black
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            UG
          </span>
        </div>

        {/* Divider continues to the right */}
        <div className="flex-1 h-full bg-black" />

      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">

      <NavBar />

      {/* PAGE OFFSET */}
      <div className="pt-20">

        {/* HERO */}
        <Hero />

        {/* SEARCH */}
        <div className="-mt-12 relative z-20">
          <SearchSection />
        </div>

        <main className="flex-1">

          {/* CATEGORIES - WHITE */}
          <section className="pt-16 bg-white">
            <CategoryGrid />
          </section>

          <PremiumDivider />

          {/* FEATURED - SLATE */}
          <section className="pt-16 bg-slate-50">
            <FeaturedCars />
          </section>

          <PremiumDivider />

          {/* BEST DEALS - WHITE */}
          <section className="pt-16 bg-white">
            <BestDeals />
          </section>

          <PremiumDivider />

          {/* LATEST ARRIVALS - SLATE */}
          <section className="pt-16 bg-slate-50">
            <LatestArrivals />
          </section>

          <PremiumDivider />

          {/* RECENTLY VIEWED - WHITE */}
          <section className="pt-16 bg-white">
            <RecentlyViewed />
          </section>

          {/* WHY CHOOSE US - SLATE */}
          <section className="mt-20 py-24 bg-slate-50">
            <WhyChooseUs />
          </section>

          {/* STATS - WHITE */}
          <section className="py-20 bg-white">
            <Stats />
          </section>

        </main>

        <Footer />

      </div>
    </div>
  );
}