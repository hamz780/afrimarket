export default function ReviewCard({
  children,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      {children}
    </div>
  );
}