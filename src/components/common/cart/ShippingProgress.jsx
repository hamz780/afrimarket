import "./ShippingProgress.css";

export default function ShippingProgress({
  subtotal,
  target,
  remaining,
}) {
  const percentage = Math.min(
    (subtotal / target) * 100,
    100
  );

  const unlocked = subtotal >= target;

  return (
    <section className="shipping-progress">

      <div className="shipping-header">

        <div>

          <h3>
            {unlocked
              ? "🎉 Free Delivery Unlocked!"
              : "🚚 Free Delivery Progress"}
          </h3>

          <p>
            {unlocked
              ? "Congratulations! Your order qualifies for FREE delivery."
              : `Spend $${remaining.toFixed(
                  2
                )} more to unlock FREE delivery.`}
          </p>

        </div>

        <strong>
          ${subtotal.toFixed(2)} / ${target}
        </strong>

      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </section>
  );
}