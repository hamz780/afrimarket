import {
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import "./CustomerReviews.css";

export default function CustomerReviews() {

  const reviews = [

    {
      id: 1,
      customer: "John Kamau",
      product: "Organic Honey",
      rating: 5,
      comment: "Excellent quality! Fast delivery and well packaged.",
    },

    {
      id: 2,
      customer: "Amina Yusuf",
      product: "Leather Sandals",
      rating: 4,
      comment: "Comfortable sandals. I highly recommend them.",
    },

    {
      id: 3,
      customer: "David Mwangi",
      product: "African Coffee",
      rating: 5,
      comment: "Amazing aroma and taste. Will definitely buy again.",
    }

  ];

  return (

    <section className="customer-reviews">

      <div className="reviews-header">

        <h2>Customer Reviews</h2>

      </div>

      <div className="reviews-list">

        {reviews.map((review)=>(

          <div
            className="review-card"
            key={review.id}
          >

            <div className="review-top">

              <div>

                <h4>{review.customer}</h4>

                <small>{review.product}</small>

              </div>

              <div className="review-stars">

                {[1,2,3,4,5].map((star)=>

                  star <= review.rating ?

                  <FaStar key={star} />

                  :

                  <FaRegStar key={star} />

                )}

              </div>

            </div>

            <p>

              "{review.comment}"

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}