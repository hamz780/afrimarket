import "./Avatar.css";

export default function Avatar({

  src,

  name = "",

  size = "md",

  status,

  verified = false,

  square = false,

}) {

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (

    <div
      className={`af-avatar ${size} ${
        square ? "square" : ""
      }`}
    >

      {src ? (

        <img
          src={src}
          alt={name}
        />

      ) : (

        <span className="af-avatar-initials">

          {initials || "U"}

        </span>

      )}

      {status && (

        <span
          className={`af-avatar-status ${status}`}
        />

      )}

      {verified && (

        <span className="af-avatar-verified">

          ✓

        </span>

      )}

    </div>

  );

}