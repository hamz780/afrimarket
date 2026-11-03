const customers = [
  {
    id: "CUS-1001",
    name: "John Smith",
    address: "25 Madison Ave",
    city: "New York",
    country: "United States",
  },
  {
    id: "CUS-1002",
    name: "Sarah Johnson",
    address: "18 Oxford Street",
    city: "London",
    country: "United Kingdom",
  },
  {
    id: "CUS-1003",
    name: "David Brown",
    address: "14 Long Street",
    city: "Cape Town",
    country: "South Africa",
  },
  {
    id: "CUS-1004",
    name: "Emma Wilson",
    address: "42 George St",
    city: "Sydney",
    country: "Australia",
  },
  {
    id: "CUS-1005",
    name: "Mohamed Ali",
    address: "55 Nile Road",
    city: "Cairo",
    country: "Egypt",
  },
  {
    id: "CUS-1006",
    name: "Grace Njeri",
    address: "12 Kenyatta Ave",
    city: "Nairobi",
    country: "Kenya",
  },
  {
    id: "CUS-1007",
    name: "Carlos Silva",
    address: "88 Paulista Ave",
    city: "São Paulo",
    country: "Brazil",
  },
  {
    id: "CUS-1008",
    name: "Fatima Hassan",
    address: "77 Marina",
    city: "Dubai",
    country: "UAE",
  },
];

const sellers = [
  {
    id: "SEL-1001",
    name: "AfriNature",
  },
  {
    id: "SEL-1002",
    name: "Coffee Africa",
  },
  {
    id: "SEL-1003",
    name: "Shea World",
  },
  {
    id: "SEL-1004",
    name: "Afri Spices",
  },
  {
    id: "SEL-1005",
    name: "Afri Crafts",
  },
];

const products = [
  {
    id: "PROD-1001",
    name: "Organic Honey",
    price: 18.99,
  },
  {
    id: "PROD-1002",
    name: "African Coffee Beans",
    price: 29.99,
  },
  {
    id: "PROD-1003",
    name: "Natural Shea Butter",
    price: 14.5,
  },
  {
    id: "PROD-1004",
    name: "Baobab Powder",
    price: 24.99,
  },
  {
    id: "PROD-1005",
    name: "Black Pepper",
    price: 9.99,
  },
  {
    id: "PROD-1006",
    name: "Organic Turmeric",
    price: 12.99,
  },
  {
    id: "PROD-1007",
    name: "Handwoven Basket",
    price: 42,
  },
  {
    id: "PROD-1008",
    name: "African Tea",
    price: 16.99,
  },
  {
    id: "PROD-1009",
    name: "Cocoa Powder",
    price: 21.5,
  },
  {
    id: "PROD-1010",
    name: "Palm Oil",
    price: 15.99,
  },
];

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const paymentStatus = [
  "Paid",
  "Pending",
];

const paymentMethods = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Stripe",
  "Apple Pay",
  "Google Pay",
];

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pad(number) {
  return String(number).padStart(4, "0");
}

const initialOrders = Array.from({ length: 100 }, (_, index) => {
  const customer = customers[index % customers.length];
  const seller = sellers[index % sellers.length];

  const product1 = products[index % products.length];
  const product2 = products[(index + 3) % products.length];

  const quantity1 = (index % 3) + 1;
  const quantity2 = (index % 2) + 1;

  const subtotal =
    product1.price * quantity1 +
    product2.price * quantity2;

  const shipping = 5 + (index % 8);

  const tax = Number((subtotal * 0.08).toFixed(2));

  const discount =
    index % 5 === 0
      ? Number((subtotal * 0.1).toFixed(2))
      : 0;

  const total = Number(
    (
      subtotal +
      shipping +
      tax -
      discount
    ).toFixed(2)
  );

  const month = (index % 6) + 1;
  const day = (index % 28) + 1;

  return {
    id: `ORD-${1001 + index}`,

    customerId: customer.id,
    customerName: customer.name,

    sellerId: seller.id,
    sellerName: seller.name,

    items: [
      {
        id: product1.id,
        name: product1.name,
        quantity: quantity1,
        price: product1.price,
      },
      {
        id: product2.id,
        name: product2.name,
        quantity: quantity2,
        price: product2.price,
      },
    ],

    subtotal,

    shipping,

    tax,

    discount,

    total,

    payment: random(paymentStatus),

    paymentMethod: random(paymentMethods),

    status: random(statuses),

    tracking: `TRK${pad(100001 + index)}`,

    shippingAddress: {
      name: customer.name,
      address: customer.address,
      city: customer.city,
      country: customer.country,
    },

    date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
  };
});

export const orderStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const paymentStatuses = [
  "Paid",
  "Pending",
];

export const paymentMethodsList = [
  "Visa",
  "Mastercard",
  "PayPal",
  "Stripe",
  "Apple Pay",
  "Google Pay",
];

export default initialOrders;