import { useRef } from "react";

import "./ImageUploader.css";

import {
  FaCloudUploadAlt,
  FaTrash,
} from "react-icons/fa";

export default function ImageUploader({

  image,

  setImage,

  label = "Upload Image",

  accept = "image/*",

}) {

  const fileInput = useRef(null);

  function handleFile(file) {

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setImage(reader.result);

    };

    reader.readAsDataURL(file);

  }

  function onChange(e) {

    handleFile(e.target.files[0]);

  }

  function onDrop(e) {

    e.preventDefault();

    handleFile(e.dataTransfer.files[0]);

  }

  return (

    <div className="ui-upload">

      <label className="ui-upload-label">

        {label}

      </label>

      <div

        className="ui-upload-box"

        onClick={() =>
          fileInput.current.click()
        }

        onDragOver={(e) =>
          e.preventDefault()
        }

        onDrop={onDrop}

      >

        {image ? (

          <div className="ui-upload-preview">

            <img

              src={image}

              alt="Preview"

            />

            <button

              type="button"

              className="remove-image"

              onClick={(e) => {

                e.stopPropagation();

                setImage("");

              }}

            >

              <FaTrash />

            </button>

          </div>

        ) : (

          <>

            <FaCloudUploadAlt
              className="upload-icon"
            />

            <h3>

              Upload Image

            </h3>

            <p>

              Click or Drag & Drop

            </p>

          </>

        )}

        <input

          ref={fileInput}

          type="file"

          hidden

          accept={accept}

          onChange={onChange}

        />

      </div>

    </div>

  );

}