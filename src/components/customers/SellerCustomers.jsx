import { useNavigate } from "react-router-dom";

import CustomerSummary from "../../../components/customers/CustomerSummary";

import CustomerFilters from "../../../components/customers/CustomerFilters";

import CustomerTable from "../../../components/customers/CustomerTable";


import "./SellerCustomers.css";


export default function SellerCustomers() {


  const navigate = useNavigate();



  function handleViewCustomer(id){

    navigate(`/seller/customers/${id}`);

  }



  return (

    <div className="seller-customers-page">


      <div className="seller-customers-header">


        <div>

          <h1>

            Customers

          </h1>


          <p>

            Manage your customers, orders, and activity.

          </p>


        </div>


      </div>



      <CustomerSummary />



      <CustomerFilters />



      <CustomerTable

        onView={handleViewCustomer}

      />


    </div>

  );

}