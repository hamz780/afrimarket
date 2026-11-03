import {
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";

import "./AddressBook.css";

export default function AddressBook() {

  const addresses = [

    {
      id:1,
      label:"Home",
      icon:<FaHome />,
      name:"Hamza",
      phone:"+256 788 886 366",
      address:"Kampala, Uganda",
      default:true,
    },

    {
      id:2,
      label:"Office",
      icon:<FaBuilding />,
      name:"Hamza",
      phone:"+256 788 886 366",
      address:"Nairobi, Kenya",
      default:false,
    },

  ];

  return (

    <section className="address-book">

      <div className="address-header">

        <h2>

          📍 Saved Addresses

        </h2>

        <button>

          <FaPlus />

          Add Address

        </button>

      </div>

      <div className="address-grid">

        {addresses.map((item)=>(

          <div
            className={`address-card ${
              item.default ? "default-card" : ""
            }`}
            key={item.id}
          >

            {item.default && (

              <span className="default-badge">

                <FaCheckCircle />

                Default

              </span>

            )}

            <div className="address-title">

              {item.icon}

              <h3>{item.label}</h3>

            </div>

            <p>

              <strong>{item.name}</strong>

            </p>

            <p>

              <FaPhone />

              {item.phone}

            </p>

            <p>

              <FaMapMarkerAlt />

              {item.address}

            </p>

            <div className="address-actions">

              <button className="edit-btn">

                <FaEdit />

                Edit

              </button>

              <button className="delete-btn">

                <FaTrash />

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}