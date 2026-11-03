import "./Skeleton.css";

export default function Skeleton({

  width = "100%",

  height = "16px",

  radius = "8px",

  className = "",

}) {

  return (

    <div

      className={`af-skeleton ${className}`}

      style={{

        width,

        height,

        borderRadius: radius,

      }}

    />

  );

}