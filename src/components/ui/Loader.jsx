import "./Loader.css";

export default function Loader({

  size = "md",

  text,

  fullscreen = false,

}) {

  const loader = (

    <div className="af-loader-wrapper">

      <div className={`af-loader ${size}`} />

      {

        text && (

          <p className="af-loader-text">

            {text}

          </p>

        )

      }

    </div>

  );

  if (fullscreen) {

    return (

      <div className="af-loader-fullscreen">

        {loader}

      </div>

    );

  }

  return loader;

}