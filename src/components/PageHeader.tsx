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
        background: `
        linear-gradient(
          135deg,
          ${siteConfig.colors.dark},
          ${siteConfig.colors.secondary}
        )
        `,
      }}
    >
      {/* TOP RIGHT GLOW */}
      <div
        className="
        absolute
        -top-20
        right-0
        w-[350px]
        h-[350px]
        rounded-full
        bg-blue-400/10
        blur-[100px]
        "
      />

      {/* LEFT GLOW */}
      <div
        className="
        absolute
        left-0
        bottom-0
        w-[300px]
        h-[300px]
        rounded-full
        bg-blue-600/10
        blur-[120px]
        "
      />

      {/* VIGNETTE */}
      <div
        className="
        absolute
        inset-0
        shadow-[inset_0_0_100px_rgba(0,0,0,0.35)]
        "
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="max-w-3xl">

          <div
            className="
            inline-flex
            px-4
            py-2
            rounded-full
            border
            border-white/15
            bg-white/10
            backdrop-blur-md
            text-blue-100
            text-sm
            font-medium
            mb-5
            "
          >
            CarConnectUG
          </div>

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

          {subtitle && (
            <p
              className="
              mt-4
              text-blue-100
              text-lg
              leading-relaxed
              "
            >
              {subtitle}
            </p>
          )}

        </div>

      </div>
    </section>
  );
}