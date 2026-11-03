import { useParams, useNavigate } from "react-router-dom";

import {

  FaArrowLeft,

  FaEnvelope,

  FaPhone,

  FaMapMarkerAlt,

  FaShoppingBag,

  FaDollarSign,

  FaStar,

} from "react-icons/fa";


import Button from "../../../components/ui/Button/Button";

import Avatar from "../../../components/ui/Avatar/Avatar";

import Badge from "../../../components/ui/Badge/Badge";

import Card from "../../../components/ui/Card/Card";


import { useCustomers } from "../../../context/CustomerContext";


import "./CustomerDetails.css";


export default function CustomerDetails(){


  const {

    id,

  } = useParams();


  const navigate = useNavigate();



  const {

    customers,

  } = useCustomers();



  const customer = customers.find(

    (item)=> item.id === id

  );



  if(!customer){

    return (

      <div className="customer-not-found">

        <h2>

          Customer Not Found

        </h2>


        <Button

          onClick={()=>navigate(-1)}

        >

          Back

        </Button>

      </div>

    );

  }



  return (

    <div className="customer-details-page">


      <div className="customer-details-header">


        <Button

          variant="secondary"

          onClick={()=>navigate(-1)}

        >

          <FaArrowLeft />

          Back

        </Button>


      </div>



      <Card>


        <div className="customer-profile">


          <Avatar

            src={customer.avatar}

            name={customer.fullName}

            size="lg"

          />


          <div>


            <h1>

              {customer.fullName}

            </h1>


            <Badge

              variant={

                customer.status === "Active"

                ? "success"

                : "danger"

              }

            >

              {customer.status}

            </Badge>


            <Badge

              variant="warning"

            >

              {customer.customerType}

            </Badge>


          </div>


        </div>


      </Card>



      <div className="customer-info-grid">


        <Card>


          <h2>

            Contact Information

          </h2>


          <p>

            <FaEnvelope />

            {customer.email}

          </p>


          <p>

            <FaPhone />

            {customer.phone}

          </p>


          <p>

            <FaMapMarkerAlt />

            {customer.city}, {customer.country}

          </p>


        </Card>



        <Card>


          <h2>

            Customer Statistics

          </h2>


          <p>

            <FaShoppingBag />

            Orders: {customer.totalOrders}

          </p>


          <p>

            <FaDollarSign />

            Spent: ${customer.totalSpent.toFixed(2)}

          </p>


          <p>

            <FaStar />

            Reviews: {customer.reviews}

          </p>


        </Card>


      </div>



      <div className="customer-detail-links">


        <Button

          onClick={()=>navigate(

            `/seller/customers/${id}/orders`

          )}

        >

          Orders

        </Button>


        <Button

          onClick={()=>navigate(

            `/seller/customers/${id}/reviews`

          )}

        >

          Reviews

        </Button>


        <Button

          onClick={()=>navigate(

            `/seller/customers/${id}/addresses`

          )}

        >

          Addresses

        </Button>


      </div>


    </div>

  );

}