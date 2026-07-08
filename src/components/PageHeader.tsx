import siteConfig from "../config/siteConfig";

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-14
        mb-12
      "
      style={{
        background: siteConfig.gradients.premium,
      }}
    >
      {/* TOP RIGHT BRAND GLOW */}
      <div
        className="
          absolute
          -top-20
          right-0
          w-[350px]
          h-[350px]
          rounded-full
          blur-[100px]
        "
        style={{
          background: `${siteConfig.colors.primary}20`,
        }}
      />

      {/* LEFT BLACK DEPTH GLOW */}
      <div
        className="
          absolute
          left-0
          bottom-0
          w-[300px]
          h-[300px]
          rounded-full
          blur-[120px]
        "
        style={{
          background: `${siteConfig.colors.secondary}40`,
        }}
      />

      {/* PREMIUM VIGNETTE */}
      <div
        className="
          absolute
          inset-0
          shadow-[inset_0_0_120px_rgba(0,0,0,0.45)]
        "
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* PREMIUM HEADER LAYOUT */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">

          {/* LEFT LOGO ANCHOR */}
          <div className="flex-shrink-0">
            <img
              src={siteConfig.logo}
              alt={siteConfig.companyName}
              className="
                h-20
                md:h-24
                w-auto
                object-contain
                drop-shadow-xl
                select-none
              "
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 max-w-3xl">

            {/* BRAND BADGE */}
            <div
              className="
                inline-flex
                px-4
                py-2
                rounded-full
                border
                border-white/10
                bg-white/10
                backdrop-blur-md
                text-white
                text-sm
                font-bold
                tracking-[0.15em]
                uppercase
                mb-5
              "
            >
              {siteConfig.companyName}
            </div>

            {/* PAGE TITLE */}
            <h1
              className="
                text-4xl
                md:text-5xl
                font-black
                text-white
                leading-tight
              "
            >
              {title}
            </h1>

            {/* SUBTITLE */}
            {subtitle && (
              <p
                className="
                  mt-4
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                {subtitle}
              </p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}