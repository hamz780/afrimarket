import {
  FaShoppingBag,
  FaHeart,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";

import "./DashboardOverview.css";

export default function DashboardOverview() {

  const stats = [

    {
      id: 1,
      title: "Total Orders",
      value: 24,
      icon: <FaShoppingBag />,
      color: "green",
    },

    {
      id: 2,
      title: "Wishlist",
      value: 18,
      icon: <FaHeart />,
      color: "red",
    },

    {
      id: 3,
      title: "Total Spending",
      value: "$2,840",
      icon: <FaDollarSign />,
      color: "gold",
    },

    {
      id: 4,
      title: "Reviews",
      value: 37,
      icon: <FaStar />,
      color: "blue",
    },

  ];

  return (

    <section className="dashboard-overview">

      {stats.map((item) => (

        <div
          className={`overview-card ${item.color}`}
          key={item.id}
        >

          <div className="overview-icon">

            {item.icon}

          </div>

          <div className="overview-content">

            <h3>{item.value}</h3>

            <p>{item.title}</p>

          </div>

        </div>

      ))}

    </section>

  );

}