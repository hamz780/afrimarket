import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const ReviewContext = createContext();

const initialReviews = [
  {
    id: "REV-1001",
    orderId: "ORD-1001",
    productId: "PROD-1001",
    productName: "Organic Honey",
    customerId: "CUS-1001",
    customerName: "John Smith",
    rating: 5,
    title: "Excellent Product",
    comment:
      "Pure honey with amazing taste. Fast delivery and excellent packaging.",
    date: "2026-07-20",
    status: "Published",
    helpful: 12,
    reported: false,
    verifiedPurchase: true,
    sellerReply: {
      text: "Thank you for your purchase and your wonderful feedback!",
      date: "2026-07-21",
    },
  },
  {
    id: "REV-1002",
    orderId: "ORD-1002",
    productId: "PROD-1002",
    productName: "African Coffee Beans",
    customerId: "CUS-1002",
    customerName: "Sarah Johnson",
    rating: 4,
    title: "Very Good",
    comment: "Fresh beans and great aroma.",
    date: "2026-07-18",
    status: "Published",
    helpful: 5,
    reported: false,
    verifiedPurchase: true,
    sellerReply: null,
  },
  {
    id: "REV-1003",
    orderId: "ORD-1003",
    productId: "PROD-1003",
    productName: "Natural Shea Butter",
    customerId: "CUS-1003",
    customerName: "David Brown",
    rating: 2,
    title: "Packaging Issue",
    comment: "Product is okay but arrived damaged.",
    date: "2026-07-15",
    status: "Reported",
    helpful: 1,
    reported: true,
    verifiedPurchase: true,
    sellerReply: null,
  },
];

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(initialReviews);

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  function getReviewById(id) {
    return reviews.find((review) => review.id === id);
  }

  function addReview(review) {
    setReviews((current) => [
      ...current,
      {
        id: `REV-${Date.now()}`,
        helpful: 0,
        reported: false,
        verifiedPurchase: false,
        sellerReply: null,
        status: "Published",
        ...review,
      },
    ]);
  }

  function updateReview(id, updates) {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              ...updates,
            }
          : review
      )
    );
  }

  function deleteReview(id) {
    setReviews((current) =>
      current.filter((review) => review.id !== id)
    );
  }

  function replyToReview(id, text) {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              sellerReply: {
                text,
                date: new Date()
                  .toISOString()
                  .split("T")[0],
              },
            }
          : review
      )
    );
  }

  function reportReview(id) {
    updateReview(id, {
      reported: true,
      status: "Reported",
    });
  }

  function resolveReport(id) {
    updateReview(id, {
      reported: false,
      status: "Published",
    });
  }

  function toggleHelpful(id) {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              helpful: review.helpful + 1,
            }
          : review
      )
    );
  }

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.productName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        review.customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        review.comment
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        review.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRating =
        ratingFilter === "All" ||
        review.rating === Number(ratingFilter);

      const matchesStatus =
        statusFilter === "All" ||
        review.status === statusFilter;

      return (
        matchesSearch &&
        matchesRating &&
        matchesStatus
      );
    });
  }, [
    reviews,
    search,
    ratingFilter,
    statusFilter,
  ]);

  const reviewStats = useMemo(() => {
    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              reviews.reduce(
                (sum, review) =>
                  sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          );

    return {
      totalReviews,

      averageRating,

      fiveStars: reviews.filter(
        (review) => review.rating === 5
      ).length,

      fourStars: reviews.filter(
        (review) => review.rating === 4
      ).length,

      threeStars: reviews.filter(
        (review) => review.rating === 3
      ).length,

      twoStars: reviews.filter(
        (review) => review.rating === 2
      ).length,

      oneStars: reviews.filter(
        (review) => review.rating === 1
      ).length,

      reportedReviews: reviews.filter(
        (review) => review.reported
      ).length,
    };
  }, [reviews]);

  const value = {
    reviews,
    filteredReviews,
    reviewStats,

    search,
    setSearch,

    ratingFilter,
    setRatingFilter,

    statusFilter,
    setStatusFilter,

    getReviewById,

    addReview,
    updateReview,
    deleteReview,

    replyToReview,
    reportReview,
    resolveReport,
    toggleHelpful,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error(
      "useReviews must be used inside ReviewProvider"
    );
  }

  return context;
}