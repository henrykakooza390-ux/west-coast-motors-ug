import siteConfig from "../config/siteConfig";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${siteConfig.colors.dark} 0%, #f8fafc 100%)`,
      }}
    >
      {children}
    </div>
  );
}