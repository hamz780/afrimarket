import "./Badge.css";

export default function Badge({

  children,

  variant = "primary",

  size = "md",

  rounded = true,

}) {

  return (

    <span

      className={`

        af-badge

        ${variant}

        ${size}

        ${rounded ? "rounded" : ""}

      `}

    >

      {children}

    </span>

  );

}