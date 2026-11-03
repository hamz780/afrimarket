import Sidebar from "../../components/common/seller/Sidebar";
import Topbar from "../../components/common/seller/Topbar";

import AnalyticsCards from "../../components/common/seller/analytics/AnalyticsCards";
import SalesChart from "../../components/common/seller/analytics/SalesChart";
import RevenueChart from "../../components/common/seller/analytics/RevenueChart";
import TopProducts from "../../components/common/seller/analytics/TopProducts";
import TopCategories from "../../components/common/seller/analytics/TopCategories";
import RecentActivity from "../../components/common/seller/analytics/RecentActivity";
import DateFilter from "../../components/common/seller/analytics/DateFilter";

import "./SellerAnalytics.css";

export default function SellerAnalytics() {
  return (
    <div className="seller-dashboard">

      <Sidebar />

      <div className="seller-main">

        <Topbar />

        <div className="seller-content">

          <div className="analytics-header">

            <div>

              <h1>Seller Analytics</h1>

              <p>
                Monitor your sales performance,
                revenue, customers and business growth.
              </p>

            </div>

            <DateFilter />

          </div>

          <AnalyticsCards />

          <div className="analytics-grid">

            <SalesChart />

            <RevenueChart />

          </div>

          <div className="analytics-grid">

            <TopProducts />

            <TopCategories />

          </div>

          <RecentActivity />

        </div>

      </div>

    </div>
  );
}