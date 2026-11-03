import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        background: "#f8fafc",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          margin: 0,
          color: "#f97316",
        }}
      >
        404
      </h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "#f97316",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        Return to Dashboard
      </Link>
    </div>
  );
}