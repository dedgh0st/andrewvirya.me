type OgImageTemplateProps = {
  category: string;
  path: string;
  subtitle: string;
  title: string;
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export function OgImageTemplate({
  category,
  path,
  subtitle,
  title,
}: OgImageTemplateProps) {
  const subtitleLimit = 132;
  const subtitleEnd = subtitle.lastIndexOf(" ", subtitleLimit);
  const conciseSubtitle =
    subtitle.length > subtitleLimit
      ? `${subtitle.slice(0, subtitleEnd > 0 ? subtitleEnd : subtitleLimit)}…`
      : subtitle;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        padding: 56,
        backgroundColor: "#090A0F",
        color: "#F4F4F5",
        border: "1px solid #1E2029",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(#1E2029 1px, transparent 1px), linear-gradient(90deg, #1E2029 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.22,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #1E2029",
            backgroundColor: "#0D0E14",
            padding: "10px 14px",
            color: "#F4F4F5",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          andrewvirya.me
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #1E2029",
            backgroundColor: "#0D0E14",
            padding: "10px 14px",
            color: "#A1A1AA",
            fontSize: 16,
          }}
        >
          {path}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "28px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 22,
            color: "#EF4444",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            fontSize: title.length > 38 ? 54 : 68,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            marginTop: 24,
            color: "#A1A1AA",
            fontSize: 24,
            lineHeight: 1.4,
          }}
        >
          {conciseSubtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          color: "#71717A",
          fontSize: 15,
        }}
      >
        Andrew Virya Victorio
        <div
          style={{
            display: "flex",
            width: 7,
            height: 7,
            margin: "0 12px",
            borderRadius: 4,
            backgroundColor: "#EF4444",
          }}
        />
        Security research &amp; engineering
      </div>
    </div>
  );
}
