type OgCardProps = {
  path: string;
  subtitle: string;
  title: string;
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

function conciseSubtitle(subtitle: string) {
  const limit = 86;
  if (subtitle.length <= limit) {
    return subtitle;
  }

  const end = subtitle.lastIndexOf(" ", limit);
  return `${subtitle.slice(0, end > 0 ? end : limit)}…`;
}

export function OgCard({ path, subtitle, title }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 48,
        padding: 64,
        overflow: "hidden",
        border: "1px solid #1E2029",
        backgroundColor: "#090A0F",
        color: "#F4F4F5",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#A1A1AA",
          fontFamily: "monospace",
          fontSize: 20,
        }}
      >
        <div style={{ display: "flex" }}>andrewvirya.me</div>
        <div style={{ display: "flex" }}>{path}</div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 4,
            backgroundColor: "#EF4444",
          }}
        />
        <div
          style={{
            display: "flex",
            maxWidth: 1056,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 1056,
            color: "#A1A1AA",
            fontSize: 24,
            lineHeight: 1.4,
          }}
        >
          {conciseSubtitle(subtitle)}
        </div>
      </div>
    </div>
  );
}
