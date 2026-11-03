import {
  FaShoppingBag,
  FaTruck,
  FaHeart,
  FaTag,
  FaBell,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

import "./Notifications.css";

export default function Notifications() {

  const notifications = [

    {
      id:1,
      icon:<FaShoppingBag />,
      title:"Order Confirmed",
      message:"Your Samsung Galaxy S25 order has been confirmed.",
      time:"5 minutes ago",
      unread:true,
      type:"order",
    },

    {
      id:2,
      icon:<FaTruck />,
      title:"Order Shipped",
      message:"Your package is on the way.",
      time:"2 hours ago",
      unread:true,
      type:"shipping",
    },

    {
      id:3,
      icon:<FaHeart />,
      title:"Wishlist Price Drop",
      message:"Nike Air Max is now 15% OFF.",
      time:"Yesterday",
      unread:false,
      type:"wishlist",
    },

    {
      id:4,
      icon:<FaTag />,
      title:"Flash Sale",
      message:"Mega Electronics Sale starts today.",
      time:"2 days ago",
      unread:false,
      type:"sale",
    },

  ];

  return (

    <section className="notifications">

      <div className="notifications-header">

        <h2>

          🔔 Notifications

        </h2>

        <button>

          Mark All Read

        </button>

      </div>

      <div className="notifications-list">

        {notifications.map((item)=>(

          <div
            className={`notification-card ${
              item.unread ? "unread" : ""
            }`}
            key={item.id}
          >

            <div className={`notification-icon ${item.type}`}>

              {item.icon}

            </div>

            <div className="notification-content">

              <h3>

                {item.title}

              </h3>

              <p>

                {item.message}

              </p>

              <span>

                {item.time}

              </span>

            </div>

            <div className="notification-actions">

              <button>

                <FaCheck />

              </button>

              <button>

                <FaTrash />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}