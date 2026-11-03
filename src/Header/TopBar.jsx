import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaPhoneAlt
} from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="topbar">

      <div className="topbar-container">

        <div className="topbar-left">

          <span>

            <FaMapMarkerAlt />

            Deliver to Uganda

          </span>

          <span>

            <FaTruck />

            Track Order

          </span>

        </div>

        <div className="topbar-right">

          <Link to="/">
            Help Center
          </Link>

          <Link to="/">
            Sell on AfriMarket
          </Link>

          <span>

            <FaPhoneAlt />

            +256 788 886 366

          </span>

        </div>

      </div>

    </div>
  );
}