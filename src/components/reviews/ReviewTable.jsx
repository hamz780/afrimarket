import { Link } from "react-router-dom";

export default function ReviewTable() {
  const reviews = [
    {
      id: 1,
      customer: "John Smith",
      product: "Wireless Headphones",
      rating: 5,
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      product: "Smart Watch",
      rating: 4,
    },
  ];

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Customer</th>
          <th>Product</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.customer}</td>

            <td>{review.product}</td>

            <td>{review.rating} ★</td>

            <td>
              <Link
                to={`/seller/reviews/${review.id}`}
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}