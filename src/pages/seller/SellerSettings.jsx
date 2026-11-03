import Sidebar from "../../components/common/seller/Sidebar";
import Topbar from "../../components/common/seller/Topbar";

import ProfileSettings from "../../components/common/seller/settings/ProfileSettings";
import PaymentSettings from "../../components/common/seller/settings/PaymentSettings";
import ShippingSettings from "../../components/common/seller/settings/ShippingSettings";
import NotificationSettings from "../../components/common/seller/settings/NotificationSettings";
import SecuritySettings from "../../components/common/seller/settings/SecuritySettings";
import StoreAppearance from "../../components/common/seller/settings/StoreAppearance";
import Preferences from "../../components/common/seller/settings/Preferences";

import "./SellerSettings.css";

export default function SellerSettings() {
  return (
    <div className="seller-dashboard">

      <Sidebar />

      <div className="seller-main">

        <Topbar />

        <div className="seller-content">

          <div className="settings-header">

            <div>

              <h1>Seller Settings</h1>

              <p>
                Manage your store profile, payment methods,
                shipping, security and preferences.
              </p>

            </div>

          </div>

          <div className="settings-container">

            <ProfileSettings />

            <PaymentSettings />

            <ShippingSettings />

            <NotificationSettings />

            <SecuritySettings />

            <StoreAppearance />

            <Preferences />

          </div>

        </div>

      </div>

    </div>
  );
}