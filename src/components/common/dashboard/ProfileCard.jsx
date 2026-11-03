import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCamera,
  FaEdit,
  FaCrown,
} from "react-icons/fa";

import "./ProfileCard.css";

export default function ProfileCard() {

  return (

    <section className="profile-card">

      <div className="profile-cover"></div>

      <div className="profile-content">

        <div className="profile-avatar">

          <img
            src="https://ui-avatars.com/api/?name=Hamza&background=16a34a&color=ffffff&size=200"
            alt="Profile"
          />

          <button className="camera-btn">

            <FaCamera />

          </button>

        </div>

        <div className="profile-info">

          <div className="profile-name">

            <h2>Hamza</h2>

            <span className="member-badge">

              <FaCrown />

              Premium Member

            </span>

          </div>

          <div className="profile-details">

            <p>

              <FaEnvelope />

              hamza@example.com

            </p>

            <p>

              <FaPhone />

              +256 788 886 366

            </p>

            <p>

              <FaMapMarkerAlt />

              Kampala, Uganda

            </p>

            <p>

              <FaCalendarAlt />

              Member Since 2026

            </p>

          </div>

          <button className="edit-profile-btn">

            <FaEdit />

            Edit Profile

          </button>

        </div>

      </div>

    </section>

  );

}