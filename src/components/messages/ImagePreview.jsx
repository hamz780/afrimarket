import "./ImagePreview.css";

export default function ImagePreview({
  image,
  onRemove,
}) {
  if (!image) return null;

  return (
    <div className="image-preview">

      <img
        src={image}
        alt="Preview"
      />

      <button
        type="button"
        onClick={onRemove}
      >
        ✕
      </button>

    </div>
  );
}