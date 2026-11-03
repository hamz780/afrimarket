import CustomerSidebar from "./customer/CustomerSidebar";

import DashboardHeader from "../components/common/dashboard/DashboardHeader";
import DashboardOverview from "../components/common/dashboard/DashboardOverview";
import ProfileCard from "../components/common/dashboard/ProfileCard";
import OrderHistory from "../components/common/dashboard/OrderHistory";
import WishlistPanel from "../components/common/dashboard/WishlistPanel";
import AddressBook from "../components/common/dashboard/AddressBook";
import PaymentMethods from "../components/common/dashboard/PaymentMethods";
import Notifications from "../components/common/dashboard/Notifications";
import AccountSettings from "../components/common/dashboard/AccountSettings";

import "./Dashboard.css";

export default function Dashboard() {
  return (
    <section className="dashboard-page">

      {/* ==========================================
          CUSTOMER SIDEBAR
      ========================================== */}

      <CustomerSidebar />

      {/* ==========================================
          DASHBOARD CONTENT
      ========================================== */}

      <main className="dashboard-content">

        <DashboardHeader />

        <DashboardOverview />

        <ProfileCard />

        <OrderHistory />

        <WishlistPanel />

        <AddressBook />

        <PaymentMethods />

        <Notifications />

        <AccountSettings />

      </main>

    </section>
  );
}