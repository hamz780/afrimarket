import {

  FaUsers,

  FaUserCheck,

  FaCrown,

  FaShoppingBag,

  FaDollarSign,

} from "react-icons/fa";

import StatsCard from "../ui/StatsCard/StatsCard";

import { useCustomers } from "../../context/CustomerContext";


export default function CustomerSummary() {

  const {

    customerStats,

  } = useCustomers();


  return (

    <div className="customer-summary-grid">


      <StatsCard

        title="Total Customers"

        value={customerStats.totalCustomers}

        icon={<FaUsers />}

        color="primary"

      />


      <StatsCard

        title="Active Customers"

        value={customerStats.activeCustomers}

        icon={<FaUserCheck />}

        color="success"

      />


      <StatsCard

        title="Premium Customers"

        value={customerStats.premiumCustomers}

        icon={<FaCrown />}

        color="warning"

      />


      <StatsCard

        title="Total Orders"

        value={customerStats.totalOrders}

        icon={<FaShoppingBag />}

        color="primary"

      />


      <StatsCard

        title="Revenue"

        value={`$${customerStats.totalRevenue.toFixed(2)}`}

        icon={<FaDollarSign />}

        color="success"

      />


    </div>

  );

}