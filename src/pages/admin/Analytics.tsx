import { useEffect, useState } from "react";
import {
  Car,
  Star,
  BadgeCheck,
  TrendingUp,
  Clock,
  Eye,
  DollarSign,
  Shield,
} from "lucide-react";

import { getVehicles } from "../../utils/vehicleStorage";

export default function Analytics() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const data = await getVehicles();

      setVehicles(data);

      setLoading(false);
    };

    load();
  }, []);

  const stats = {
    totalVehicles: vehicles.length,

    featured: vehicles.filter(
      (v) => v.featured
    ).length,

    bestDeals: vehicles.filter(
      (v) => v.bestDeal
    ).length,

    verified: vehicles.filter(
      (v) => v.verified
    ).length,

    sold: vehicles.filter(
      (v) => v.status === "sold"
    ).length,

    pending: vehicles.filter(
      (v) => v.status === "pending"
    ).length,

    totalViews: vehicles.reduce(
      (sum, v) => sum + (v.views || 0),
      0
    ),
  };

  const parsePrice = (price: any) => {
    if (!price) return 0;

    return Number(
      String(price).replace(/[^\d]/g, "")
    );
  };

  const expensive = [...vehicles]
    .sort(
      (a, b) =>
        parsePrice(b.price) -
        parsePrice(a.price)
    )
    .slice(0, 5);

  const cheapest = [...vehicles]
    .sort(
      (a, b) =>
        parsePrice(a.price) -
        parsePrice(b.price)
    )
    .slice(0, 5);

  const mostViewed = [...vehicles]
    .sort(
      (a, b) =>
        (b.views || 0) -
        (a.views || 0)
    )
    .slice(0, 5);

  const recent = [...vehicles]
    .sort(
      (a, b) =>
        (b.createdAt || 0) -
        (a.createdAt || 0)
    )
    .slice(0, 5);

  if (loading)
    return (
      <div className="p-8">
        Loading analytics...
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen p-8">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Marketplace insights and
          performance metrics
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">

        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          icon={<Car size={22} />}
        />

        <StatCard
          title="Featured"
          value={stats.featured}
          icon={<Star size={22} />}
        />

        <StatCard
          title="Best Deals"
          value={stats.bestDeals}
          icon={<TrendingUp size={22} />}
        />

        <StatCard
          title="Verified"
          value={stats.verified}
          icon={<BadgeCheck size={22} />}
        />

        <StatCard
          title="Sold"
          value={stats.sold}
          icon={<DollarSign size={22} />}
        />

        <StatCard
          title="Views"
          value={stats.totalViews}
          icon={<Eye size={22} />}
        />

      </div>

      {/* SECOND ROW */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <AnalyticsCard
          title="Most Expensive Vehicles"
          icon={<DollarSign />}
        >
          {expensive.map((car) => (
            <Row
              key={car.id}
              title={`${car.make} ${car.model}`}
              value={car.price}
            />
          ))}
        </AnalyticsCard>

        <AnalyticsCard
          title="Cheapest Vehicles"
          icon={<DollarSign />}
        >
          {cheapest.map((car) => (
            <Row
              key={car.id}
              title={`${car.make} ${car.model}`}
              value={car.price}
            />
          ))}
        </AnalyticsCard>

      </div>

      {/* THIRD ROW */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <AnalyticsCard
          title="Most Viewed Vehicles"
          icon={<Eye />}
        >
          {mostViewed.map((car) => (
            <Row
              key={car.id}
              title={`${car.make} ${car.model}`}
              value={`${car.views || 0} views`}
            />
          ))}
        </AnalyticsCard>

        <AnalyticsCard
          title="Recently Added"
          icon={<Clock />}
        >
          {recent.map((car) => (
            <Row
              key={car.id}
              title={`${car.make} ${car.model}`}
              value={car.location}
            />
          ))}
        </AnalyticsCard>

      </div>

      {/* INVENTORY HEALTH */}
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex items-center gap-3 mb-6">
          <Shield />
          <h2 className="text-2xl font-bold">
            Inventory Health
          </h2>
        </div>

        <ProgressRow
          label="Featured"
          current={stats.featured}
          total={stats.totalVehicles}
        />

        <ProgressRow
          label="Best Deals"
          current={stats.bestDeals}
          total={stats.totalVehicles}
        />

        <ProgressRow
          label="Verified"
          current={stats.verified}
          total={stats.totalVehicles}
        />

        <ProgressRow
          label="Sold"
          current={stats.sold}
          total={stats.totalVehicles}
        />

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: any) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex justify-between">
        {icon}
      </div>

      <div className="text-3xl font-bold mt-4">
        {value}
      </div>

      <div className="text-slate-500 mt-1">
        {title}
      </div>
    </div>
  );
}

function AnalyticsCard({
  title,
  icon,
  children,
}: any) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        {icon}

        <h2 className="text-xl font-bold">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}

function Row({
  title,
  value,
}: any) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span>{title}</span>
      <span className="font-bold">
        {value}
      </span>
    </div>
  );
}

function ProgressRow({
  label,
  current,
  total,
}: any) {
  const percentage =
    total === 0
      ? 0
      : (current / total) * 100;

  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span>
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className="h-3 rounded-full bg-blue-600"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

    </div>
  );
}