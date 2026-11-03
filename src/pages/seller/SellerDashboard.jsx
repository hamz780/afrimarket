import SellerSidebar from "../../components/common/seller/SellerSidebar";
import SellerHeader from "../../components/common/seller/SellerHeader";
import SellerOverview from "../../components/common/seller/SellerOverview";
import ProductsTable from "../../components/common/seller/ProductsTable";
import OrdersTable from "../../components/common/seller/OrdersTable";
import SalesAnalytics from "../../components/common/seller/SalesAnalytics";
import InventoryStatus from "../../components/common/seller/InventoryStatus";
import CustomerReviews from "../../components/common/seller/CustomerReviews";
import EarningsCard from "../../components/common/seller/EarningsCard";

import "./SellerDashboard.css";

export default function SellerDashboard() {
  return (
    <section className="seller-dashboard">

      <SellerSidebar />

      <main className="seller-main">

        <SellerHeader />

        <div className="seller-content">

          <SellerOverview />

          <SalesAnalytics />

          <EarningsCard />

          <ProductsTable />

          <OrdersTable />

          <InventoryStatus />

          <CustomerReviews />

        </div>

      </main>

    </section>
  );
}